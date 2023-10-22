const emailVerify = (urlVerify, email, username) => {
  const text = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="x-apple-disable-message-reformatting" />
    <title></title>
    <link
      href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,600,700"
      rel="stylesheet"
      type="text/css"
    />

    <!-- CSS Reset -->
    <style>
      html,
      body {
        font-size: 15px;
        font-weight: 300;
        letter-spacing: 0.03em;
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        color: #111111;
        background: #fff;
      }

      * {
        font-weight: 300;
        font-size: 15px;
        color: #111111;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      a {
        color: #111111;
      }

      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }


      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      table table table {
        table-layout: auto;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      *[x-apple-data-detectors] {
        color: #111111 !important;
        text-decoration: none !important;
      }

      .x-gmail-data-detectors,
      .x-gmail-data-detectors *,
      .aBn {
        color: #fff !important;
        border-bottom: 0 !important;
        cursor: default !important;
      }

      .x-gmail-data-detectors a:hover {
        cursor: pointer !important;
      }

      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }

      img.g-img + div {
        display: none !important;
      }

      .button-link {
        text-decoration: none !important;
      }

      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        /* iPhone 6 and 6+ */
        .email-container {
          min-width: 375px !important;
        }
      }

      table.email-container tr td:last-child ul,
      table.email-container tr td:last-child p {
        margin-bottom: 0;
      }
    </style>

    <style>
      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      a,
      ul {
        font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont,
          Helvetica, Arial, sans-serif;
      }

      .button-td,
      .button-a {
        transition: all 100ms ease-in;
      }

      .button-td:hover,
      .button-a:hover {
        background: #01b4e4 !important;
        border-color: #01b4e4 !important;
      }

      @media screen and (max-width: 480px) {
        .fluid {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .stack-column,
        .stack-column-center {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          direction: ltr !important;
        }

        .stack-column-center {
          text-align: center !important;
        }

        .center-on-narrow {
          text-align: left !important;
          display: block !important;
          margin-left: auto !important;
          margin-right: auto !important;
          float: none !important;
        }

        table.center-on-narrow {
          display: inline-block !important;
        }
      }
    </style>
  </head>
  <body
    width="100%"

  >
    <div style="width: 100%; background: #fff; text-align: left">
      <!-- Visually Hidden Preheader Text : BEGIN -->
      <div
        style="
          display: none;
          font-size: 1px;
          line-height: 1px;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;

          font-family: sans-serif;
        "
      >
        Hi, ${username}! We need to confirm your email address in order to activate
        your account.
      </div>

      <div style="max-width: 680px; margin: auto" class="email-container">
        <table
          role="presentation"
          aria-hidden="true"
          cellspacing="0"
          cellpadding="0"
          width="100%"
          style="max-width: 680px"
        >
          <tr>
            <td
              style="
                padding-top: 30px;
                padding-left: 20px;
                padding-right: 20px;
                text-align: left;
              "
            >
              <img
                style="display: block"
                src="https://res.cloudinary.com/dw5smdqyb/image/upload/v1697969741/Goose/logo_sotyvv.png"
                aria-hidden="true"
                width="200"
                alt="Logo Goose Track"
              />
            </td>
          </tr>
        </table>

        <table
          class="email-container"
          role="presentation"
          aria-hidden="true"
          cellspacing="0"
          cellpadding="0"
          width="100%"
          style="max-width: 680px"
        >
          <!-- Email Body : BEGIN -->
          <tr>
            <td>
              <table
                role="presentation"
                aria-hidden="true"
                cellspacing="0"
                cellpadding="0"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        padding: 40px 20px 0 20px;
                        text-align: left;
                        font-family: 'Source Sans Pro', -apple-system,
                          BlinkMacSystemFont, Helvetica, Arial, sans-serif;
                        color: #111111;
                      "
                    >
                      <h2
                        style="
                          font-size: 20px;
                          font-weight: 700;
                          letter-spacing: 0.08em;
                          margin: 0 0 8px 0;
                          color: #111111;
                        "
                      >
                        Hi, ${username}!
                      </h2>
                      <hr
                        style="
                          text-align: left;
                          margin: 0px;
                          width: 120px;
                          height: 3px;
                          color: #3E85F3;
                          background-color: #3E85F3;
                          border-radius: 4px;
                          border: none;
                        "
                      />

                      <p
                        style="
                          font-size: 15px;
                          font-weight: 300;
                          color: #111111;
                        "
                      >
                        Thanks for signing up to Goose Track.
                        Before we can continue, we need to validate your email
                        address.
                      </p>

                      <p style="margin: 40px 0; color: #111111">
                        <a
                          style="
                            color: #111111;
                            border-radius: 20px;
                            border: 10px solid #3E85F3;
                            background-color: #3E85F3;
                            padding: 0 10px;
                            text-transform: uppercase;
                            text-decoration: none;
                            font-weight: 700;
                          "
                          href="${urlVerify}"
                          >Activate My Account</a
                        >
                      </p>

                      <p
                        style="
                          font-size: 15px;
                          font-weight: 300;
                          color: #111111;
                        "
                      >
                        As a friendly reminder, your account details are:
                      </p>

                      <ul>
                        <li style="color: #111111">Username: ${username}</li>
                        <li style="color: #111111">
                          Email:
                          <a
                            style="color: #111111"
                            href="mailto:${email}"
                            >${email}</a
                          >
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </body>
</html>`;

  return text;
};

export default emailVerify;
