export default function Signin() {
  return (
    <section className="flex flex-col items-center justify-center gap-2 rounded-2xl text-text">
      <input
        className="h-14 w-full rounded-xl bg-foreground px-4 placeholder:text-textAlt/20 focus:outline-none"
        type="text"
        id="displayname"
        autoComplete="displayname"
        name="displayname"
        placeholder="Display Name"
        required
      />
      <input
        className="h-14 w-full rounded-xl bg-foreground px-4 placeholder:text-textAlt/20 focus:outline-none"
        type="password"
        id="password"
        autoComplete="current-password"
        name="password"
        placeholder="Password"
        required
      />
    </section>
  );
}
