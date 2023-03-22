//components
import Button from '@epicapp/components/Button';

export default function () {
    return (
        <section className="rounded-3xl bg-surface p-4">
      <form>
        <div className="flex flex-row gap-4">
            <div className="w-full overflow-hidden rounded-2xl bg-foreground text-text">
                <input
                className="h-9 w-full border-b border-layer bg-transparent p-3 placeholder:text-textAlt/20 focus:outline-none"
                type="text"
                name="title"
                placeholder="Creative title for your new post."
                />
            </div>
            <div className="mt-2">
                <Button
                    type="submit"
                    className="rounded-2xl bg-layer px-6 py-2 text-textAlt transition-colors hover:bg-primary hover:text-black"
                >
                    Share
                </Button>
                </div>
            </div>
      </form>
    </section>
    )
}