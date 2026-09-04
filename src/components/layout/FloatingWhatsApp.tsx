import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { whatsappHref } from '@/data/business';
import { enquiryMessage } from '@/lib/estimate';
import { en } from '@/i18n/en';

/** Always-visible WhatsApp action, bottom-right. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref(enquiryMessage({}))}
      target="_blank"
      rel="noreferrer"
      aria-label={en.actions.whatsappChat}
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex min-h-[48px] items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-ui-sm font-medium text-ink shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-colors duration-instant hover:bg-paper max-sm:pr-1.5"
    >
      <WhatsAppIcon size={36} className="shrink-0 transition-transform duration-instant group-hover:scale-105" />
      <span className="hidden sm:inline">{en.actions.whatsappChat}</span>
    </a>
  );
}
