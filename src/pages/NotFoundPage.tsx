import { TopNav } from "@/components/shared/TopNav";
import { Footer } from "@/components/shared/Footer";
import { Btn } from "@/components/atoms/Btn";
import { Eyebrow } from "@/components/atoms/Eyebrow";

export default function NotFoundPage() {
  return (
    <div className="artboard dense">
      <TopNav active="landing" />
      <main id="main">
        <section
          style={{
            padding: "64px 56px",
            maxWidth: 760,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <Eyebrow>404 · not found</Eyebrow>
          <h1 className="headline" style={{ fontSize: 56, lineHeight: 1.05, margin: "8px 0 16px" }}>
            That page <em>isn't on this map.</em>
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-soft)", lineHeight: 1.6, marginBottom: 24 }}>
            The route you tried doesn't exist on this beta. Head back to the landing page or open
            the in-product Hub.
          </p>
          <div className="row gap-3 itemsCenter" style={{ justifyContent: "center" }}>
            <Btn variant="primary" as="a" href="/">
              Back to landing
            </Btn>
            <Btn variant="ghost" as="a" href="/app">
              Open Hub
            </Btn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
