import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo';

const agoContainer = 'max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8';

const primaryBtn =
  'inline-flex items-center justify-center gap-2 bg-primary text-secondary font-semibold px-6 py-3 rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-colors duration-200 whitespace-nowrap';

interface ProseBlock {
  heading?: string;
  subheading?: string;
  paragraphs: string[];
}

const proseBlocks: ProseBlock[] = [
  {
    heading: 'Interpretation and Definitions',
    subheading: 'Interpretation',
    paragraphs: [
      'The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.',
    ],
  },
  {
    subheading: 'Definitions',
    paragraphs: [
      'For the purposes of this Disclaimer:',
    ],
  },
  {
    paragraphs: [
      '<strong>Company</strong> (WS Turbomar Private Limited in this Disclaimer) refers to Aviation spare, FIEE Complex, A-35, Block A, Okhla Phase II, Okhla Industrial Estate, New Delhi, Delhi 110020.',
      '<strong>Service</strong> refers to the Website.',
      '<strong>You</strong> means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.',
      '<strong>Website</strong> refers to agoaviation.com, accessible from <a href="https://agoaviation.com/" target="_blank" rel="noopener noreferrer">https://agoaviation.com/</a>',
    ],
  },
  {
    heading: 'Disclaimer',
    paragraphs: [
      'The information contained on the Service is for general information purposes only.',
      'The Company assumes no responsibility for errors or omissions in the contents of the Service.',
      'In no event shall the Company be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. The Company reserves the right to make additions, deletions, or modifications to the contents on the Service at any time without prior notice. This Disclaimer has been created with the help of the <a href="https://www.termsfeed.com/disclaimer-generator/" target="_blank" rel="noopener noreferrer">Disclaimer Generator</a>.',
      'The Company does not warrant that the Service is free of viruses or other harmful components.',
    ],
  },
  {
    heading: 'External Links Disclaimer',
    paragraphs: [
      'The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Company.',
      'Please note that the Company does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.',
    ],
  },
  {
    heading: 'Errors and Omissions Disclaimer',
    paragraphs: [
      'The information given by the Service is for general guidance on matters of interest only. Even if the Company takes every precaution to ensure that the content of the Service is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules and regulations, there may be delays, omissions or inaccuracies in the information contained on the Service.',
      'The Company is not responsible for any errors or omissions, or for the results obtained from the use of this information.',
    ],
  },
  {
    heading: 'Fair Use Disclaimer',
    paragraphs: [
      'The Company may use copyrighted material which has not always been specifically authorized by the copyright owner. The Company is making such material available for criticism, comment, news reporting, teaching, scholarship, or research.',
      'The Company believes this constitutes a "fair use" of any such copyrighted material as provided for in section 107 of the United States Copyright law.',
      'If You wish to use copyrighted material from the Service for your own purposes that go beyond fair use, You must obtain permission from the copyright owner.',
    ],
  },
  {
    heading: 'Views Expressed Disclaimer',
    paragraphs: [
      'The Service may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer or company, including the Company.',
      'Comments published by users are their sole responsibility and the users will take full responsibility, liability and blame for any libel or litigation that results from something written in or as a direct result of something written in a comment. The Company is not liable for any comment published by users and reserves the right to delete any comment for any reason whatsoever.',
    ],
  },
  {
    heading: 'No Responsibility Disclaimer',
    paragraphs: [
      'The information on the Service is provided with the understanding that the Company is not herein engaged in rendering legal, accounting, tax, or other professional advice and services. As such, it should not be used as a substitute for consultation with professional accounting, tax, legal or other competent advisers.',
      'In no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your access or use or inability to access or use the Service.',
      'All information in the Service is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.',
      'The Company will not be liable to You or anyone else for any decision made or action taken in reliance on the information given by the Service or for any consequential, special or similar damages, even if advised of the possibility of such damages.',
    ],
  },
  {
    heading: '"Use at Your Own Risk" Disclaimer',
    paragraphs: [
      'The information on the Service is provided with the understanding that the Company is not herein engaged in rendering legal, accounting, tax, or other professional advice and services.',
    ],
  },
  {
    heading: 'Contact Us',
    paragraphs: [
      'If you have any questions about this Disclaimer, You can contact Us:',
      'By Address: FIEE Complex, A-35, Block A, Okhla Phase II, Okhla Industrial Estate, New Delhi, Delhi 110020',
    ],
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: 'Disclaimer – AGO Aviation Website Information',
  description:
    'Read the AGO Aviation disclaimer covering content accuracy, part-number references, brand names, liability limits and the use of website information.',
  path: '/disclaimer',
  keywords: ['AGO Aviation disclaimer', 'website disclaimer', 'part number disclaimer'],
});

export default function DisclaimerPage() {
  return (
    <main className="bg-white">
      <section className="py-15 bg-soft">
        <div className={agoContainer}>
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight mb-4">
              Disclaimer
            </h1>
            <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">
              Disclaimer policy of WS Turbomar Private Limited at agoaviation.com. Understand
              limitations of liability.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact" className={`${primaryBtn} text-sm`}>
              Request a quote
              <i className="fa-solid fa-arrow-right text-[12px]"></i>
            </a>
            <a href="/products" className="inline-flex items-center justify-center gap-2 bg-white text-ink border border-line font-semibold px-6 py-3 rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-colors duration-200 whitespace-nowrap text-sm">
              Browse catalogue
              <i className="fa-solid fa-arrow-right text-[12px]"></i>
            </a>
          </div>
        </div>
      </section>

      <nav className="ago-crumbs" aria-label="Breadcrumb">
        <div className={agoContainer}>
          <Link href="/" className="text-muted text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-muted text-sm mx-1">/</span>
          <span className="text-ink text-sm font-medium">Disclaimer</span>
        </div>
      </nav>

      <section className="py-15">
        <div className={agoContainer}>
          <div className="ago-prose max-w-3xl text-muted leading-relaxed space-y-6">
            {proseBlocks.map((block, index) => (
              <div key={index} className="space-y-3">
                {block.heading && (
                  <h2 className="text-xl font-bold text-ink">{block.heading}</h2>
                )}
                {block.subheading && (
                  <h3 className="text-lg font-bold text-primary">{block.subheading}</h3>
                )}
                {block.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-muted leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-15 bg-soft">
        <div className={agoContainer}>
          <div className="rounded-lg bg-white p-8 md:p-12 border border-line shadow-sm text-center">
            <h2 className="text-2xl font-bold text-ink mb-3">
              Need a part number confirmed today?
            </h2>
            <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Send us the OEM reference, equipment model or a nameplate photo. Our engineering desk
              replies with availability, condition and lead time — usually within a few hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contact" className={`${primaryBtn} text-sm`}>
                Request a quote
                <i className="fa-solid fa-arrow-right text-[12px]"></i>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-ink border border-line font-semibold px-6 py-3 rounded-[20px_0px] hover:bg-secondary hover:text-primary transition-colors duration-200 whitespace-nowrap text-sm"
              >
                <i className="fa-brands fa-whatsapp text-secondary"></i>
                WhatsApp the desk
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
