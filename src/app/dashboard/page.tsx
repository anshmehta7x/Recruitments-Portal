import Taskcard from "@/components/taskcard";

export default function Page() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-[15vh]">
      <section className="flex flex-col font-striger text-center text-2xl md:text-4xl mb-[5vh]">
        <h1 className="text-main-pink">Congratulations!</h1>
        <h1 className="text-white">
          you&apos;ve been selected in the following domains
        </h1>
      </section>
      <section className="flex flex-col w-full px-[5vw] md:mb-5">
        <h1 className="font-striger text-4xl text-white">Tasks</h1>
      </section>
      <div className="flex items-center justify-center w-full px-8">
        <section className="flex flex-col md:grid md:grid-cols-3 md:gap-8 w-full my-2 pb-2">
          <Taskcard
            domain="Publicity and Marketing"
            subDomain="pnm"
            completed={false}
          />
          <Taskcard domain="Web Dev" subDomain="web" completed={false} />
          <Taskcard domain="App Dev" subDomain="app" completed={false} />
          <Taskcard
            domain="Graphic Design"
            subDomain="graphic"
            completed={false}
          />
          <Taskcard domain="Research" subDomain="research" completed={true} />
        </section>
      </div>
    </div>
  );
}
