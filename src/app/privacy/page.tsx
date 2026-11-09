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
    paragraphs: [
      'This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.',
      'We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank" rel="noopener noreferrer">Privacy Policy Generator</a>.',
    ],
  },
  {
    heading: 'Interpretation and Definitions',
    subheading: 'Interpretation',
    paragraphs: [
      'The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.',
    ],
  },
  {
    subheading: 'Definitions',
    paragraphs: ['For the purposes of this Privacy Policy:'],
  },
  {
    paragraphs: [
      '<strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.',
      '<strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.',
      '<strong>Company</strong> (WS Turbomar Private Limited in this Agreement) refers to Aviation spare, FIEE Complex, A-35, Block A, Okhla Phase II, Okhla Industrial Estate, New Delhi, Delhi 110020.',
      '<strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.',
      '<strong>Country</strong> refers to: Delhi, India',
      '<strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.',
    ],
  },
  {
    heading: 'Collecting and Using Your Personal Data',
    paragraphs: [
      'While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:',
      'Usage Data is collected automatically when using the Service.',
      'Usage Data may include information such as Your Device\'s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.',
      'When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.',
      'We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.',
    ],
  },
  {
    paragraphs: [
      'We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:',
      'We use both Session and Persistent Cookies for the purposes set out below:',
    ],
  },
  {
    paragraphs: [
      '<strong>Type:</strong> Session Cookies<br /><strong>Administered by:</strong> Us<br /><strong>Purpose:</strong> These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.',
      '<strong>Type:</strong> Persistent Cookies<br /><strong>Administered by:</strong> Us<br /><strong>Purpose:</strong> These Cookies identify if users have accepted the use of cookies on the Website.',
      '<strong>Type:</strong> Persistent Cookies<br /><strong>Administered by:</strong> Us<br /><strong>Purpose:</strong> These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.',
      'For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.',
    ],
  },
  {
    paragraphs: [
      'The Company may use Personal Data for the following purposes:',
      'We may share Your personal information in the following situations:',
      'The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.',
      'The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.',
    ],
  },
  {
    paragraphs: [
      'Your information, including Personal Data, is processed at the Company\'s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.',
      'Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.',
      'The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.',
      'You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.',
    ],
  },
  {
    heading: 'Children\'s Privacy',
    paragraphs: [
      'Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with personal data, please contact Us. If We become aware that We have collected personal data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.',
    ],
  },
  {
    heading: 'Links to Other Websites',
    paragraphs: [
      'Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party\'s site. We strongly advise You to review the Privacy Policy of every site You visit.',
      'We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.',
    ],
  },
  {
    heading: 'Changes to this Privacy Policy',
    paragraphs: [
      'We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.',
      'We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.',
    ],
  },
  {
    heading: 'Contact Us',
    paragraphs: [
      'If you have any questions about this Privacy Policy, You can contact Us:',
      'By email: contactus@agoaviation.com',
      'By phone: +91 7011123269',
      'By Address: FIEE Complex, A-35, Block A, Okhla Phase II, Okhla Industrial Estate, New Delhi, Delhi 110020',
    ],
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy – How AGO Aviation Handles Your Data',
  description:
    'Read how WS Turbomar Private Limited (AGO Aviation) collects, uses, stores and protects personal data submitted through enquiries, quotes and website forms.',
  path: '/privacy',
  keywords: ['AGO Aviation privacy policy', 'WS Turbomar privacy', 'data protection policy'],
});

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <section className="py-15 bg-soft">
        <div className={agoContainer}>
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">
              Privacy policy of WS Turbomar Private Limited at agoaviation.com. Learn how we
              collect, use, and protect your personal data across our aviation services.
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
          <span className="text-ink text-sm font-medium">Privacy Policy</span>
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
