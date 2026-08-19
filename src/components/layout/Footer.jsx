function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500 text-xl font-bold text-black">
                TN
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  TechNews
                </h2>

                <p className="text-sm text-zinc-500">
                  Personalized Tech Feed
                </p>
              </div>

            </div>

            <p className="leading-7 text-zinc-400">
              Everything a Techie Needs.
              <br />
              One Personalized Platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-zinc-400">

              <li>
                <a href="#" className="transition hover:text-teal-400">
                  Home
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-teal-400">
                  News
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-teal-400">
                  Jobs
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-teal-400">
                  Hackathons
                </a>
              </li>

            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Resources
            </h3>

            <ul className="space-y-3 text-zinc-400">

              <li>
                <a href="#" className="transition hover:text-teal-400">
                  Courses
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-teal-400">
                  AI Updates
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-teal-400">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-teal-400">
                  Contact
                </a>
              </li>

            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Connect
            </h3>

            <ul className="space-y-3 text-zinc-400">

              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-teal-400"
                >
                  GitHub
                </a>
              </li>

              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-teal-400"
                >
                  LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-teal-400"
                >
                  X (Twitter)
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-zinc-800 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-zinc-500 md:flex-row">

            <p>
              © {new Date().getFullYear()} TechNews. All Rights Reserved.
            </p>

            <p>
              Built with ❤️ using React, Tailwind CSS & Firebase.
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;