export default function Signup() {
  return (
    <section className="flex flex-col items-center justify-center gap-2 rounded-2xl text-text">
      <input
        className="h-14 w-full rounded-xl bg-foreground px-4 placeholder:text-textAlt/20 focus:outline-none"
        type="text"
        id="username"
        name="username"
        placeholder="Display Name"
        required
      />
      <input
        className="h-14 w-full rounded-xl bg-foreground px-4 placeholder:text-textAlt/20 focus:outline-none"
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        required
      />
      <input
        className="h-14 w-full rounded-xl bg-foreground px-4 placeholder:text-textAlt/20 focus:outline-none"
        type="password"
        id="confirm_password"
        name="confirm_password"
        placeholder="Confirm Password"
        required
      />
      <div className="flex w-full overflow-hidden rounded-xl bg-foreground">
        <div className="flex items-center bg-layer px-4 text-textAlt">
          www.github.com/
        </div>
        <input
          className="h-14 w-full bg-transparent px-4 placeholder:text-textAlt/20 focus:outline-none"
          type="text"
          id="github"
          name="github"
          placeholder="Github Username"
          required
        />
      </div>
    </section>
  );
}
