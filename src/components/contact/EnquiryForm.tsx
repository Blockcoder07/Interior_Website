import { useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { business, telHref, whatsappHref } from '@/data/business';
import { RATE_DISCLAIMER, getService, isCategory, services } from '@/data/services';
import { enquiryMessage, estimate, formatEstimate } from '@/lib/estimate';
import { formatRate } from '@/lib/format';
import type { Category } from '@/types/project';
import { en } from '@/i18n/en';

type Errors = Partial<Record<'name' | 'phone' | 'city' | 'category' | 'area', string>>;

const CITY_OPTIONS = [...business.citiesServed, 'Other'] as const;

/** Enquiry form with the live estimate and WhatsApp action — Section 6.6. */
export function EnquiryForm() {
  const [params] = useSearchParams();
  const initialCategory = params.get('category') ?? '';
  const initialCity = params.get('city') ?? '';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(() => CITY_OPTIONS.find((c) => c.toLowerCase() === initialCity.toLowerCase()) ?? '');
  const [category, setCategory] = useState<Category | ''>(isCategory(initialCategory) ? initialCategory : '');
  const [area, setArea] = useState(params.get('area') ?? '');
  const [message, setMessage] = useState('');
  const [department, setDepartment] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const MESSAGE_MAX = 250;
  const [sent, setSent] = useState<'whatsapp' | 'mail' | null>(null);

  const areaNum = Number(area);
  const est = useMemo(() => estimate(category || undefined, areaNum), [category, areaNum]);
  const service = category ? getService(category) : undefined;
  const t = en.contact;

  const validate = (): Errors => {
    const e: Errors = {};
    if (!name.trim()) e.name = t.errName;
    if (!/^\+?[\d\s-]{10,15}$/.test(phone.trim())) e.phone = t.errPhone;
    if (!city) e.city = t.errCity;
    if (!category) e.category = t.errCategory;
    if (area && !(areaNum >= 100)) e.area = t.errArea;
    return e;
  };

  const fields = () => ({
    name,
    city: city || undefined,
    category: category || undefined,
    areaSqft: areaNum > 0 ? areaNum : undefined,
    message: department ? `${t.department}: ${department}\n${message}` : message,
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const body = `${enquiryMessage(fields())}\nPhone: ${phone.trim()}`;
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(body)}`;
    setSent('mail');
  };

  const openWhatsApp = () => {
    const errs = validate();
    // WhatsApp needs less: city, category and area are enough to start.
    delete errs.name;
    delete errs.phone;
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    window.open(whatsappHref(enquiryMessage(fields())), '_blank', 'noopener');
    setSent('whatsapp');
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label={t.name} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} {...(errors.name ? { error: errors.name } : {})} />
        <Input
          label={t.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          {...(errors.phone ? { error: errors.phone } : {})}
        />
        <Select label={t.city} value={city} onChange={(e) => setCity(e.target.value)} {...(errors.city ? { 'aria-invalid': true } : {})}>
          <option value="">{t.chooseCity}</option>
          {CITY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Select
          label={t.category}
          value={category}
          onChange={(e) => setCategory(isCategory(e.target.value) ? e.target.value : '')}
          {...(errors.category ? { 'aria-invalid': true } : {})}
        >
          <option value="">{t.chooseCategory}</option>
          {services.map((s) => (
            <option key={s.category} value={s.category}>
              {s.name}
            </option>
          ))}
        </Select>
        <Input
          label={t.area}
          type="number"
          inputMode="numeric"
          min={100}
          step={10}
          placeholder="1200"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          hint={t.areaHint}
          {...(errors.area ? { error: errors.area } : {})}
        />
        <div className="flex flex-col gap-1.5">
          <span className="spec text-graphite">{t.estimate}</span>
          <div className="flex h-11 items-center border-b border-hairline">
            {est ? (
              <span className="font-mono text-spec-lg text-ink">{formatEstimate(est)}</span>
            ) : (
              <span className="spec text-cement">
                {service && service.ratePerSqft === null ? t.rateOnEnquiry : t.estimateEmpty}
              </span>
            )}
          </div>
          <span className="spec text-cement">
            {est && service?.ratePerSqft ? `${formatRate(service.ratePerSqft)} · ` : ''}
            {RATE_DISCLAIMER}
          </span>
        </div>
      </div>
      {(errors.city || errors.category) && (
        <p className="text-body-sm text-brass" role="alert">
          {errors.city ?? errors.category}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-[minmax(0,14rem)_1fr]">
        <Select label={t.department} value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">{t.chooseDepartment}</option>
          {t.departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
        <Textarea
          label={t.message}
          value={message}
          maxLength={MESSAGE_MAX}
          onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_MAX))}
          hint={`${message.length}/${MESSAGE_MAX} · ${t.messageHint}`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-hairline pt-6">
        <Button type="submit">{en.actions.sendEnquiry}</Button>
        <Button type="button" variant="secondary" onClick={openWhatsApp}>
          <WhatsAppIcon size={22} />
          {en.actions.whatsapp}
        </Button>
        <a href={telHref()} className="spec inline-flex min-h-[44px] items-center text-graphite hover:text-brass">
          {t.orCall} {business.phoneDisplay}
        </a>
      </div>

      {sent && (
        <p className="border border-hairline bg-paper px-4 py-3 text-body-sm text-ink" role="status">
          {sent === 'whatsapp' ? t.sentWhatsApp : t.sentMail}
        </p>
      )}
    </form>
  );
}
