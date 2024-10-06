import Header from './components/header';
import LeftBox from './components/left';
import RightBox from './components/right';

function Page() {
  return (
    <div className="flex h-full flex-col bg-[#ffeb00] pt-[52px]">
      <Header />
      <div className="flex w-full justify-center gap-4">
        <LeftBox />
        <RightBox />
      </div>
    </div>
  );
}

export default Page;
