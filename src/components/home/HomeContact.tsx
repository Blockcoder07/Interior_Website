import { EnquiryForm } from '@/components/contact/EnquiryForm';
import { OfficePanel } from '@/components/contact/OfficePanel';
import { en } from '@/i18n/en';

/** Grey band with the gold title, then the form card beside the details panel. */
export function HomeContact() {
  return (
    <section id="contact" aria-labelledby="home-contact-h">
      <div className="bg-band py-10 text-center">
        <h2 id="home-contact-h" className="font-heading text-[2.5rem] font-medium text-brass sm:text-[3.125rem]">
          {en.contact.title}
        </h2>
      </div>
      <div className="container-site py-12 lg:py-20">
        <p className="mx-auto mb-10 max-w-prose text-center text-body text-ink">{en.contact.intro}</p>
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="card p-6 sm:p-10 lg:col-span-7">
            <EnquiryForm />
          </div>
          <div className="lg:col-span-5">
            <OfficePanel />
          </div>
        </div>
      </div>
    </section>
  );
}
