import { useNavigate } from "react-router";
import { useWindow } from "../hooks/useWidth";
import { IoArrowBackSharp } from "react-icons/io5";

const PrivacyPolicy = () => {
  const width = useWindow();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen px-3.75 lg:px-16 xl:px-32 pt-21 2xl:pt-30 2xl:pb-10">
      <div className="max-w-5xl mx-auto rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          {width >= 768 && (
            <IoArrowBackSharp
              size={30}
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
          )}
          <h1 className="text-3xl md:text-4xl font-bold  text-gray-800">
            Privacy Policy
          </h1>
        </div>

        <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
          Last Updated: February 2026
        </p>

        <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
          At Globex, we value your privacy and are committed to protecting your
          personal information. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our
          website or make a purchase from us. By using our services, you agree
          to the practices described in this policy.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800">
          1. Information We Collect
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
          We may collect personal information that you voluntarily provide when
          registering on the website, placing an order, subscribing to our
          newsletter, or contacting customer support. This may include your
          name, email address, phone number, billing and shipping address, and
          payment information.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
          Additionally, we automatically collect certain information when you
          visit our website, such as your IP address, browser type, device
          information, and browsing behavior through cookies and tracking
          technologies.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800">
          2. How We Use Your Information
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
          We use the information we collect to process transactions, manage
          orders, provide customer support, improve our website functionality,
          personalize your shopping experience, and send promotional emails if
          you have opted in. We may also use your data to analyze trends,
          monitor usage patterns, and enhance security.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800">
          3. Sharing of Information
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
          We do not sell or rent your personal information. However, we may
          share your information with trusted third-party service providers who
          assist in operating our website, processing payments, delivering
          products, and conducting marketing activities. These partners are
          required to maintain confidentiality and use your information only for
          specified purposes.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800">
          4. Cookies and Tracking Technologies
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
          Our website uses cookies to enhance your browsing experience. Cookies
          help us understand user behavior, remember preferences, and improve
          site performance. You may choose to disable cookies through your
          browser settings, but doing so may limit certain features of the
          website.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800">
          5. Data Security
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          alteration, disclosure, or destruction. While we strive to protect
          your data, no method of transmission over the internet is completely
          secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800">
          6. Your Rights
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
          Depending on your location, you may have the right to access, update,
          correct, or delete your personal information. You may also opt out of
          receiving promotional communications at any time by clicking the
          unsubscribe link in our emails or contacting us directly.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800">
          7. Third-Party Links
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of those external
          sites. We encourage users to review the privacy policies of any
          third-party sites they visit.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800">
          8. Changes to This Policy
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date. Continued use of
          our website after such changes constitutes your acknowledgment and
          acceptance of the updated policy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
