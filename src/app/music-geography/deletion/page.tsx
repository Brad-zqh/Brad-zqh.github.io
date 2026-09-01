import type { Metadata } from 'next';
import MusicGeographyShell, { PolicySection } from '@/components/projects/MusicGeographyShell';

export const metadata: Metadata = { title: 'Music Geography Data Deletion Policy', description: 'Deletion and refresh procedures for the Music Geography Research Data Collector.' };

export default function MusicGeographyDeletionPage() {
  return (
    <MusicGeographyShell eyebrow="Effective 1 September 2026" title="Data Deletion Policy" summary="Deadline-based refresh or deletion for temporarily stored API Data and a separate channel for individual deletion requests.">
      <div className="grid gap-6">
        <PolicySection title="Scheduled refresh or deletion">
          <ol className="list-decimal pl-6 space-y-2"><li>Every stored YouTube API record receives an observation timestamp and a deadline no later than 30 calendar days after collection.</li><li>Before that deadline, the record is refreshed through the documented API or deleted from controlled storage.</li><li>If a video or comment is no longer returned or has been deleted on YouTube, the corresponding stored API Data is removed.</li><li>Refresh and deletion runs create an access-restricted log containing paths, timestamps, non-content counts and hashes, not comment text or API credentials.</li><li>Any longer retention is limited to the exact data and period explicitly approved by YouTube.</li></ol>
        </PolicySection>
        <PolicySection title="Request deletion"><p>Email <a className="text-accent underline underline-offset-4" href="mailto:zhaoqiuhao@zju.edu.cn?subject=Music%20Geography%20data%20deletion%20request">zhaoqiuhao@zju.edu.cn</a> with the subject <code>Music Geography data deletion request</code>. Include the public video URL, the public comment URL or comment ID if available, and only the information needed to locate the stored record.</p><p>The operator will acknowledge and verify the request without requesting unnecessary personal information, then delete matching controlled copies as soon as possible and within seven calendar days.</p></PolicySection>
        <PolicySection title="Important distinction"><p>Deleting data from this research client does not delete or modify content on YouTube. Content on YouTube must be managed using YouTube&apos;s own application and account controls.</p></PolicySection>
        <PolicySection title="Scope"><p>This process covers temporary raw API responses, processed API metadata, controlled comment tables and direct derivatives subject to the 30-day policy. It does not cover independently sourced MusicBrainz, Jamendo, FMA, GIS or researcher-authored data that contain no YouTube API Data.</p></PolicySection>
      </div>
    </MusicGeographyShell>
  );
}
