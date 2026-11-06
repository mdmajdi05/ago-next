
'use client';

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';

const PHONE = '+917011123269';
const EMAIL = 'sale@agoaviation.com';
const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsappNumber}`;

export function FloatBar() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outsideClick = (event: MouseEvent) => {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const escapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', outsideClick);
    document.addEventListener('keydown', escapeKey);

    return () => {
      document.removeEventListener('mousedown', outsideClick);
      document.removeEventListener('keydown', escapeKey);
    };
  }, []);

  const options = [
    {
      title: 'Call our team',
      subtitle: '+91 7011123269',
      href: `tel:${PHONE}`,
      type: 'call',
    },
    {
      title: 'WhatsApp',
      subtitle: 'Message our AOG desk',
      href: WHATSAPP_URL,
      type: 'whatsapp',
      external: true,
    },
    {
      title: 'Email sales',
      subtitle: EMAIL,
      href: `mailto:${EMAIL}`,
      type: 'email',
    },
  ];

  return (
    <div
      ref={widgetRef}
      className="
        !fixed !bottom-6 !right-6
        !z-[2147483000]
        !flex !w-max !flex-col !items-end
        [font-family:inherit]
        max-sm:!bottom-[14px]
        max-sm:!right-[14px]
      "
    >
      {/* CONTACT POPUP - ALWAYS ABOVE BUTTON */}
      {isOpen && (
        <section
          id="float-contact-popup"
          role="dialog"
          aria-modal="false"
          aria-labelledby="next-float-title"
          className="
            !absolute !bottom-[calc(100%+16px)] !right-0
            !box-border
            !w-[min(370px,calc(100vw-32px))]
            !max-h-[calc(100dvh-110px)]
            !overflow-y-auto
            !rounded-[20px]
            !border !border-white/[0.16]
            !bg-[#09233b]
            !p-[22px]
            !text-white
            !shadow-[0_24px_70px_rgba(4,18,32,0.34)]
            max-sm:!p-[18px]
          "
          style={{
            backgroundImage:
              'radial-gradient(circle at 100% 0, rgba(37,105,154,.32), transparent 42%), linear-gradient(145deg,#09233b,#061626)',
          }}
        >
          {/* POPUP HEADER */}
          <div className="flex items-start justify-between gap-[14px] border-b border-white/[0.12] pb-[18px]">
            <div>
              <span className="inline-flex items-center gap-2 text-[9px] font-extrabold tracking-[1.35px] text-[#ffd18a]">
                <i className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#56d7a0] shadow-[0_0_0_4px_rgba(86,215,160,.13)]" />
                AGO AVIATION SUPPORT
              </span>

              <h2
                id="next-float-title"
                className="mb-1 mt-[10px] text-[22px] font-extrabold leading-[1.2] text-white"
              >
                How can we help?
              </h2>

              <p className="text-[12px] leading-[1.5] text-white/[0.68]">
                Choose the quickest way to reach our team.
              </p>
            </div>

            {/* ORIGINAL TOP RIGHT CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close contact options"
              className="
                !grid !h-8 !w-8 !shrink-0
                !place-items-center
                !rounded-[9px]
                !border !border-white/[0.16]
                !bg-white/[0.06]
                !text-[23px] !leading-none
                !text-white/[0.8]
                hover:!bg-white/[0.12]
              "
            >
              ×
            </button>
          </div>

          {/* CONTACT OPTIONS */}
          <div className="mt-[15px] grid gap-[9px]">
            {options.map((option) => (
              <a
                key={option.type}
                href={option.href}
                target={option.external ? '_blank' : undefined}
                rel={
                  option.external
                    ? 'noopener noreferrer'
                    : undefined
                }
                className="
                  group flex min-h-16 items-center gap-3
                  rounded-[13px]
                  border border-white/10
                  bg-white/[0.055]
                  px-3 py-[10px]
                  text-white no-underline
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-[#f0a843]/50
                  hover:bg-white/10
                  hover:text-white
                "
              >
                {/* OPTION ICON */}
                <span
                  className={`
                    grid h-10 w-10 shrink-0
                    place-items-center rounded-xl
                    ${
                      option.type === 'whatsapp'
                        ? 'bg-emerald-400/[0.13] text-[#70e0a9]'
                        : 'bg-[#f0a843]/[0.13] text-[#ffd18a]'
                    }
                  `}
                >
                  {option.type === 'call' && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-none stroke-current"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.35 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z" />
                    </svg>
                  )}

                  {option.type === 'whatsapp' && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-none stroke-current"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7A8.5 8.5 0 1 1 20.5 11.5Z" />
                      <path d="M8.5 8.2c.3-.7.6-.7.9-.7h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4 0 .6l-.6.7c-.2.2-.2.4 0 .6.4.7 1.1 1.4 1.8 1.8.2.1.4-.1.6-.1l.7-.8c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5 0 .3-.2 1.1-.8 1.5-.5.4-1.1.6-1.8.4-1.1-.3-2.3-.9-3.6-2.1-1.1-1-2-2.4-2.2-3.4-.2-.8 0-1.4.7-1.8Z" />
                    </svg>
                  )}

                  {option.type === 'email' && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-none stroke-current"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  )}
                </span>

                {/* OPTION TEXT */}
                <span className="grid min-w-0 flex-1 gap-[3px]">
                  <strong className="text-[12px] font-bold text-white">
                    {option.title}
                  </strong>

                  <small className="break-words text-[11px] text-white/[0.64]">
                    {option.subtitle}
                  </small>
                </span>

                {/* ARROW */}
                <span className="ml-auto text-[17px] text-white/[0.54] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* FLOATING BUTTON - SAME RIGHT/BOTTOM ANCHOR */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="float-contact-popup"
        aria-label={
          isOpen ? 'Close contact options' : 'Contact us'
        }
        onClick={() => setIsOpen((previous) => !previous)}
        className={`
          !relative !box-border
          !inline-flex !shrink-0
          !items-center !justify-center
          !border
          !border-[rgba(255,255,255,0.35)]
          !bg-[linear-gradient(135deg,#ffd18a,#f0a843)]
          !text-[#10243a]
          !shadow-[0_13px_36px_rgba(7,26,45,0.27),inset_0_1px_0_rgba(255,255,255,0.5)]
          !transition-[transform,box-shadow]
          !duration-200
          hover:!-translate-y-[3px]
          hover:!shadow-[0_17px_40px_rgba(7,26,45,0.32),inset_0_1px_0_rgba(255,255,255,0.5)]
          focus-visible:!outline-2
          focus-visible:!outline-offset-[3px]
          focus-visible:!outline-[#f0a843]
          ${
            isOpen
              ? '!h-[58px] !w-[58px] !min-h-[58px] !min-w-[58px] !max-w-[58px] !rounded-full !p-0 !gap-0 max-sm:!h-[54px] max-sm:!w-[54px] max-sm:!min-h-[54px] max-sm:!min-w-[54px] max-sm:!max-w-[54px]'
              : '!h-[58px] !w-auto !min-h-[58px] !rounded-[18px] !gap-[10px] !px-[19px] !py-0 max-sm:!h-[54px] max-sm:!min-h-[54px] max-sm:!rounded-[17px] max-sm:!px-4'
          }
        `}
      >
        {isOpen ? (
          /* OPEN - CIRCULAR CROSS */
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="
              !block !h-[23px] !w-[23px]
              !shrink-0 !fill-none
              !stroke-current
            "
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <>
            {/* CLOSED - CHAT ICON */}
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="!h-[21px] !w-[21px] !shrink-0 !fill-none !stroke-current"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20l1.2-5.1A8.4 8.4 0 1 1 21 11.5Z" />
              <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" />
            </svg>

            <span className="!text-[#10243a] !text-[13px] !font-extrabold">
              Contact us
            </span>
          </>
        )}
      </button>
    </div>
  );
}
