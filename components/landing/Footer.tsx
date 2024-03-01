import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">

        {/* Questions */}
        <div className="mb-6">
          <p className="font-semibold text-lg">Questions? <Link href="/contact">Contact us</Link></p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <Link href="/faq">FAQ</Link>
            <br />
            <Link href="/cancel-membership">Cancel Membership</Link>
            <br />
            <Link href="/help-center">Help Center</Link>
            <br />
            <Link href="/account">Account</Link>
          </div>
          <div>
            <Link href="/media-center">Media Center</Link>
            <br />
            <Link href="/investor-relations">Investor Relations</Link>
            <br />
            <Link href="/jobs">Jobs</Link>
            <br />
            <Link href="/shop">WonderX Shop</Link>
          </div>
          <div>
            <Link href="/redeem-gift-cards">Redeem Gift Cards</Link>
            <br />
            <Link href="/buy-gift-cards">Buy Gift Cards</Link>
            <br />
            <Link href="/ways-to-watch">Ways to Watch</Link>
            <br />
            <Link href="/terms-of-use">Terms of Use</Link>
          </div>
          <div>
            <Link href="/privacy">Privacy</Link>
            <br />
            <Link href="/cookie-preferences">Cookie Preferences</Link>
            <br />
            <Link href="/impressum">Impressum</Link>
            <br />
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>

        {/* Additional Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Link href="/speed-test">Speed Test</Link>
          <Link href="/legal-guarantee">Legal Guarantee</Link>
          <Link href="/legal-notices">Legal Notices</Link>
          <Link href="/exclusive-content">Only on WonderX</Link>
          <div className="col-span-2 md:col-span-4">
            <Link href="/ad-choices">Ad Choices</Link>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} WonderX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
