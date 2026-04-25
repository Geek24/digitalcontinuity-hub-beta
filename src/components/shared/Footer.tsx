export function Footer() {
  return (
    <footer
      style={{
        padding: "20px 56px",
        borderTop: "1px solid var(--line-c)",
        background: "var(--bg-raised)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }} className="row between itemsCenter">
        <div className="row gap-3 itemsCenter">
          <span className="dc-mark" aria-hidden style={{ width: 20, height: 20 }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 13,
                color: "var(--text)",
                fontWeight: 500,
              }}
            >
              Renew EcoMe LLC
            </span>
            <span className="mono-call" style={{ fontSize: 10 }}>
              Cape Elizabeth, ME · est. 2024 · B-Corp pending
            </span>
          </div>
        </div>
        <div className="row gap-4">
          <span className="mono-call">Privacy</span>
          <span className="mono-call">DPA</span>
          <span className="mono-call">How we scan</span>
          <span className="mono-call">Stripe Climate · 1.5%</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
