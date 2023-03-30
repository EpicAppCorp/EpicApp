import Image from 'next/image';

export default function Details({ author }) {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-surface shadow-xl">
      <div className="h-32 w-full bg-primary" />
      <div className="relative h-32 w-full">
        <div className="absolute w-full -translate-y-1/2 px-12">
          <div className="flex">
            <Image
              className="overflow-hidden rounded-full border-8 border-background object-cover"
              alt="profile image"
              src="profile image"
              loader={() => author.profileImage}
              width={144}
              height={144}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
              priority={true}
            />
            <div className="my-4 flex flex-col justify-center self-end px-4">
              <h2 className="text-2xl font-semibold text-text">
                @{author.displayName}
              </h2>
              <p className="text-xs text-textAlt">{author.host}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
