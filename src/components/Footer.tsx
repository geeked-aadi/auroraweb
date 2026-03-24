const Footer = () => {
  const instagramUrl = "https://www.instagram.com/aaurora2024/";

  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <p className="font-display text-2xl font-light text-foreground mb-2">
          <span className="text-primary">Aurora</span> Makeup Studio & Academy
        </p>
        <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          Men • Women • Children
        </p>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-body text-xs uppercase tracking-[0.2em] text-primary hover:underline mb-6"
        >
          Instagram: @aaurora2024
        </a>
        <p className="font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} Aurora Makeup Studio & Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
