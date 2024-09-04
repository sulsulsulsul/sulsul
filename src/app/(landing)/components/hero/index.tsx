import { DesktopHero } from './desktop';
import { MobileHero } from './mobile';

export default function Hero() {
  return (
    <div>
      <DesktopHero className="block mobile:hidden" />
      <MobileHero className="hidden mobile:block" />
    </div>
  );
}
