function ComingSoon({ title, description }) {
  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-20 text-white">

      <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center">

        <div className="w-full text-center">


          {/* Title */}

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            {description}
          </p>

          {/* Message Card */}

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

            <p className="text-lg font-semibold text-zinc-200">
              Thanks for stopping by! ❤️
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              We're working behind the scenes to bring this
              section to life. Stay tuned!
            </p>

          </div>

          {/* Small status */}

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm text-teal-400">

            <span className="h-2 w-2 rounded-full bg-teal-400" />

            Coming Soon

          </div>

        </div>

      </div>

    </div>
  );
}

export default ComingSoon;