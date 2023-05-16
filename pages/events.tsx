import HYGHead from "@/components/HYGHead";
import MainNavigation from "@/components/MainNavigation";
import RichTextWrapper from "@/components/ui/RichTextWrapper";
import { getContentfulEntries } from "@/services/contentful/client";
import { GetStaticProps } from "next";

const Events = ({ events }: { events: any }) => {
  return (
    <>
      <HYGHead title='Events' />
      <MainNavigation>
        <main>
          <div className="h-fit w-full bg-emerald-900 p-2 md:p-10">
            {/* Idea: offer ways to sort events based on event date, last updated etc */}

            {events.map((event: any) => {
              return (
                <div
                  key={event.id}
                  className="border-2 rounded border-teal-500 shadow shadow-teal-500 p-2 my-2 text-white"
                >
                  <h3 className="text-xl my-1">{event.title}</h3>
                  <p>
                    <em>published on {event.createdAtString}</em>
                  </p>
                  <p className="font-bold mb-2">
                    The event will take place on {event.eventDate} and start at{" "}
                    {event.eventTime}.
                  </p>
                  <hr />
                  <RichTextWrapper contents={event.contents} />

                  {/* todo: insert event.location with google maps */}
                </div>
              );
            })}

            <div className="h-screen"></div>
          </div>
        </main>
      </MainNavigation>
    </>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const res: any = await getContentfulEntries({ content_type: "event" });
  const { items } = res;

  // https://stackoverflow.com/questions/19511597/how-to-get-address-location-from-latitude-and-longitude-in-google-map

  return {
    props: {
      events: items.map((item: any) => ({
        id: item.sys.id,
        createdAt: new Date(item.sys.createdAt).getTime(),
        createdAtString: new Date(item.sys.createdAt).toLocaleDateString(),
        title: item.fields.title,
        eventDate: new Date(item.fields.dateAndStartTime).toLocaleDateString(),
        eventTime: new Date(item.fields.dateAndStartTime).toLocaleTimeString(),
        location: item.fields.location,
        contents: item.fields.description,
      })),
    },
    // revalidate: 10,  // revalidate at most every 10 seconds
  };
};

export { getStaticProps };

export default Events;