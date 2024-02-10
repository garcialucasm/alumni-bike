import HeaderWebApp from "@/components/organisms/HeaderWebApp";
import AvailabilityContainer, {
  AvailabilityConfig,
} from "@/components/organisms/AvailabilityContainer";
import { MenuNavigation } from "@/types/NavigationSections";
import BookingsOverview from "@/components/organisms/BookingsOverview";

const availabilityShowSelection = AvailabilityConfig.HomeKeyKeeper;

export default function HomeKeyKeeper() {
  return (
    <>
      <div className="flex flex-col items-center text-center mb-3">
        <div className="container-webapp flex flex-col items-center pb-6">
          <div className="w-full mb-3">
            <HeaderWebApp
              headingTitle={"Alumni Bike"}
              headingSubTitle="Book, Ride, Explore: All for Free"
              currentPage={MenuNavigation.homePageApp}
            />
          </div>
          <div className="w-11/12 flex flex-col">
            <div className="flex flex-col items-center">
              <div className="w-full my-3">
                <AvailabilityContainer
                  availabilitySelection={availabilityShowSelection}
                />
              </div>
              <div className="w-full my-3">
                <BookingsOverview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
