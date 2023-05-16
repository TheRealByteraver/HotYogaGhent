import Image from "next/image";
import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";
import { GetStaticProps } from "next";
import { getContentfulEntries } from "@/services/contentful/client";
import HYGHead from "@/components/HYGHead";

const Testimonials = (props: any) => {
  return (
    <>
      <HYGHead title='Testimonials' />
      <MainNavigation>
        <main>
          <div className="h-fit w-full text-white bg-emerald-900">
            <h1 className="w-full text-center text-3xl pt-10 pb-4">
              Testimonials
            </h1>

            {/* testimonial group container */}
            <ul className="w-full flex flex-row flex-wrap justify-around text-sm text-justify px-2 sm:px-4">
              {props.testimonials.map((testimonial: any) => (
                <li key={testimonial.id}>
                  {/* individual testimonial container */}
                  <div className="relative w-full h-fit mt-28 flex flex-col bg-teal-800 rounded-lg lg:mx-4 lg:w-[460px]">
                    {/* image container */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 aspect-square overflow-hidden rounded-full">
                      <Image
                        src={testimonial.avatarUrl}
                        width={testimonial.avatarWidth}
                        height={testimonial.avatarHeight}
                        alt="author's portrait"
                      />
                    </div>

                    <div className="pt-16 pl-2">
                      <p>
                        <em>by {testimonial.author}</em>
                      </p>
                      <p>Posted on {testimonial.createdAt}</p>
                    </div>

                    <div className="mt-2 px-2">
                      <hr />
                    </div>

                    <div className="w-full h-full p-2">
                      <RichTextWrapper contents={testimonial.text} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-screen bg-emerald-900"></div>
        </main>
      </MainNavigation>
    </>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const res: any = await getContentfulEntries({ content_type: "testimonial" });
  const { items } = res;

  return {
    props: {
      testimonials: items.map((item: any) => ({
        id: item.sys.createdAt,
        createdAt: new Date(item.sys.createdAt).toLocaleDateString(),
        text: item.fields.testimonialText,
        author: item.fields.author,
        avatarUrl: "https:" + item.fields.avatar.fields.file.url,
        avatarWidth: items[0].fields.avatar.fields.file.details.image.width,
        avatarHeight: items[0].fields.avatar.fields.file.details.image.height,
      })),
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
};

export { getStaticProps };

export default Testimonials;
