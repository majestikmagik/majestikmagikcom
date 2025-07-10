<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<xsl:template match="/">
  <html>
    <head>
      <title>Majestik Magik - XML Sitemap</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/img/logo_majestikmagik.png" type="image/png" />
      <style type="text/css">
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background-color: #718096;
          color: #343a40;
          margin: 0;
          font-family: 'Montserrat', sans-serif;
          line-height: 1.6;
          padding: 1rem;
        }
        .container {
          max-width: 960px;
          margin: 0 auto;
          background-color:rgb(199, 212, 219);
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        h1 {
          color:rgb(46, 46, 46);
          border-bottom: 2px solid #dee2e6;
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        th, td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #dee2e6;
        }
        th {
          background-color: #e9ecef;
          font-weight: 600;
        }
        tr:hover {
          background-color: #f1f3f5;
        }
        a {
          color: #007bff;
          text-decoration: none;
          word-break: break-all;
        }
        a:hover {
          text-decoration: underline;
        }
        .footer {
            margin-top: 2rem;
            text-align: center;
            font-size: 0.9em;
            color: #6c757d;
        }

        /* --- Mobile View Media Query --- */
        @media screen and (max-width: 768px) {
          body {
            padding: 0.5rem;
          }
          .container {
            padding: 1rem;
          }
          table, thead, tbody, th, td, tr {
            display: block;
          }
          thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
          }
          tr {
            border: 1px solid #dee2e6;
            margin-bottom: 1rem;
            border-radius: 8px;
            overflow: hidden;
          }
          td {
            border: none;
            border-bottom: 1px solid #e9ecef;
            position: relative;
            padding-left: 50%;
            text-align: right;
          }
          td:before {
            position: absolute;
            top: 0.75rem;
            left: 0.75rem;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
            text-align: left;
            font-weight: 600;
          }
          td:nth-of-type(1):before { content: "URL"; }
          td:nth-of-type(2):before { content: "Last Modified"; }
          td:nth-of-type(3):before { content: "Change Freq."; }
          td:nth-of-type(4):before { content: "Priority"; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Majestik Magik</h1>
        <h3>XML Sitemap</h3>
        <p>This is an XML sitemap, intended for consumption by search engines. For more information about sitemaps, please see <a href="http://www.sitemaps.org/">sitemaps.org</a>.</p>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Last Modified</th>
              <th>Change Frequency</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <xsl:variable name="loc" select="sitemap:loc"/>
                  <a href="{$loc}"><xsl:value-of select="$loc"/></a>
                </td>
                <td><xsl:value-of select="sitemap:lastmod"/></td>
                <td><xsl:value-of select="sitemap:changefreq"/></td>
                <td><xsl:value-of select="sitemap:priority"/></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
        <div class="footer">
            Generated on <script>document.write(new Date().toLocaleDateString());</script> by <a href="https://majestikmagik.com">Majestik Magik</a>.
        </div>
      </div>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet>
<!-- End of file: public/sitemap.xsl -->