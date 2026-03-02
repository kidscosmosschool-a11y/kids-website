import { Helmet } from 'react-helmet-async';

const SITE = {
  name:    'Kids Cosmos School',
  baseUrl: 'https://kidscosmos.edu.np/',   
  logo:    '/img/logo.png',
  phone:   '+977-9860667648',              
  address: 'Kathmandu, Nepal',
  fb:      'https://www.facebook.com/kidscosmos', 
};

const DEFAULTS = {
  title:       'Kids Cosmos School — Nurturing Young Minds',
  description: 'Kids Cosmos School offers quality early childhood education in Nepal. Playgroup, Nursery, LKG, UKG and primary classes in a safe, joyful environment.',
  image:       '/img/f1.jpg',
};

export default function SEO({
  title,
  description = DEFAULTS.description,
  image       = DEFAULTS.image,
  url         = '',
  type        = 'website',
  isHome      = false,
}) {
  const fullTitle  = title ? `${title} | ${SITE.name}` : DEFAULTS.title;
  const fullImage  = image.startsWith('http') ? image : `${SITE.baseUrl}${image}`;
  const canonical  = `${SITE.baseUrl}${url}`;

  return (
    <Helmet>
      {/* ── Basic ── */}
      <title>{fullTitle}</title>
      <meta name="description"        content={description} />
      <meta name="robots"             content="index, follow" />
      <link rel="canonical"           href={canonical} />

      {/* ── Open Graph (Facebook, WhatsApp previews) ── */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={fullImage} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:type"        content={type} />
      <meta property="og:site_name"   content={SITE.name} />
      <meta property="og:locale"      content="en_US" />

      {/* ── Twitter / X card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={fullImage} />

      {/* ── School structured data — only on homepage ── */}
      {isHome && (
        <script type="application/ld+json">{JSON.stringify({
          '@context':   'https://schema.org',
          '@type':      'School',
          name:          SITE.name,
          url:           SITE.baseUrl,
          logo:         `${SITE.baseUrl}${SITE.logo}`,
          description:   DEFAULTS.description,
          telephone:     SITE.phone,
          address: {
            '@type':        'PostalAddress',
            streetAddress:  SITE.address,
            addressCountry: 'NP',
          },
          sameAs: [SITE.fb],
        })}</script>
      )}
    </Helmet>
  );
}