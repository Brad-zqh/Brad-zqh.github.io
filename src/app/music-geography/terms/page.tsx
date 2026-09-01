import type { Metadata } from 'next';
import Link from 'next/link';
import MusicGeographyShell, { ExternalPolicyLink, PolicySection } from '@/components/projects/MusicGeographyShell';

export const metadata: Metadata = { title: 'Music Geography Terms of Service', description: 'Terms for the Music Geography Research Data Collector.' };

export default function MusicGeographyTermsPage() {
  return (
    <MusicGeographyShell eyebrow="Effective 1 September 2026" title="Terms of Service" summary="Conditions governing the limited, non-commercial academic research client and its public transparency pages.">
      <div className="grid gap-6">
        <PolicySection title="1. Research-only client"><p>The client is an access-restricted command-line research tool, not a public search engine, media player, creator tool or commercial analytics service. These pages provide research and compliance disclosures.</p></PolicySection>
        <PolicySection title="2. Relationship to YouTube"><p>The client is subject to the <ExternalPolicyLink href="https://www.youtube.com/t/terms">YouTube Terms of Service</ExternalPolicyLink>, <ExternalPolicyLink href="https://developers.google.com/youtube/terms/api-services-terms-of-service">YouTube API Services Terms</ExternalPolicyLink>, <ExternalPolicyLink href="https://developers.google.com/youtube/terms/developer-policies">Developer Policies</ExternalPolicyLink> and <ExternalPolicyLink href="https://policies.google.com/privacy">Google Privacy Policy</ExternalPolicyLink>. YouTube and Google do not sponsor, author or endorse this client or its findings.</p></PolicySection>
        <PolicySection title="3. Permitted functionality"><p>The client uses documented read-only endpoints to search public videos, retrieve public metadata and obtain bounded public top-level comments. It has no OAuth login, upload, edit, comment, like, subscription or other write operation.</p></PolicySection>
        <PolicySection title="4. Audiovisual content"><p>The client does not download, cache, store, separate, modify or redistribute YouTube audiovisual content. Links open content on YouTube under YouTube&apos;s own terms.</p></PolicySection>
        <PolicySection title="5. Independent research outputs"><p>Research interpretations are generated independently and are not YouTube metrics or statements by YouTube. YouTube API Data is not sold or sublicensed. Publications remain subject to copyright, privacy, ethics and API-policy requirements.</p></PolicySection>
        <PolicySection title="6. No account or warranty"><p>The public pages have no user registration or paid service. Information is provided for transparency and may change with policy or research-design updates. Continuous availability is not guaranteed.</p></PolicySection>
        <PolicySection title="7. Privacy and deletion"><p>See the <Link className="text-accent underline underline-offset-4" href="/music-geography/privacy/">Privacy Policy</Link> and <Link className="text-accent underline underline-offset-4" href="/music-geography/deletion/">Data Deletion Policy</Link>. Contact: <a className="text-accent underline underline-offset-4" href="mailto:zhaoqiuhao@zju.edu.cn">zhaoqiuhao@zju.edu.cn</a>.</p></PolicySection>
        <PolicySection title="8. Suspension and changes"><p>Collection may be suspended whenever quota, policy, rights or research-ethics requirements are not satisfied. Material changes to the approved API use case will be submitted for additional review when required.</p></PolicySection>
      </div>
    </MusicGeographyShell>
  );
}
