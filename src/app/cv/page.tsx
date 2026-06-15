export default function CVPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif font-bold text-primary">CV</h1>
        <a
          href="/CV.pdf"
          download
          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent/90 transition-colors"
        >
          Download PDF
        </a>
      </div>
      <div className="w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <iframe
          src="/CV.pdf"
          className="w-full"
          style={{ height: '85vh' }}
          title="Curriculum Vitae"
        />
      </div>
    </div>
  );
}
