function Header() {
  return (
    <div className="mb-[42px] flex flex-col items-center gap-1 text-center">
      <h1 className="text-4xl font-extrabold text-[#121212]">
        커피 한 잔 값의 후원도
        <br />
        서비스 운영에 큰 도움이 돼요
      </h1>
      <p className="text-sm font-medium text-[#121212]">
        후원금은 서버 유지와 이벤트 진행에 사용돼요.
      </p>
    </div>
  );
}

export default Header;
