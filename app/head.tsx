export default function Head() {
  const wpHost = process.env.NEXT_PUBLIC_WP_HOST;
  const wpProtocol = process.env.NEXT_PUBLIC_WP_PROTOCOL || "https";
  const wpHref = wpHost ? `${wpProtocol}://${wpHost}` : undefined;
  return (
    <>
      {wpHref ? (
        <>
          <link rel="preconnect" href={wpHref} crossOrigin="" />
          <link rel="dns-prefetch" href={wpHref} />
        </>
      ) : null}
      <link
        rel="preconnect"
        href="https://framerusercontent.com"
        crossOrigin=""
      />
      <link rel="dns-prefetch" href="https://framerusercontent.com" />
    </>
  );
}
