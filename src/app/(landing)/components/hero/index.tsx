import { DesktopHero } from './desktop';
import { MobileHero } from './mobile';

export default function Hero() {
  return (
    <div>
      <DesktopHero className="mobile:hidden desktop:block" />
      <MobileHero className="mobile:block desktop:hidden" />
    </div>
  );
}
