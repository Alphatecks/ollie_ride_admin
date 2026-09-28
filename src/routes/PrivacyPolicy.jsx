import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#1c2838]">
      <header className="bg-white border-b border-[#e4eaf1]">
        <div className="max-w-[720px] mx-auto px-6 py-5 flex items-baseline justify-between">
          <Link to="/login" className="text-[22px] text-[#0C3569]">
            Ollie Ride
          </Link>
          <span className="text-[13px] text-[#8095B2]">Lagos</span>
        </div>
      </header>

      <article className="max-w-[720px] mx-auto px-6 pt-10 pb-24">
        <h1 className="text-[32px] leading-tight text-[#0C3569] font-medium">
          Privacy policy
        </h1>
        <p className="mt-2 text-[14px] text-[#8095B2]">28 September 2026</p>

        <p className="mt-8 text-[15.5px] leading-[1.75]">
          Ollie Ride books rides and rents out cars, mostly around Lagos. This
          page is what we keep on riders, drivers, rental customers, and the
          staff who sign into the admin desk, and what we do with it.
        </p>
        <p className="mt-4 text-[15.5px] leading-[1.75]">
          If you only use this site to run the desk, the section called
          “People who work on the desk” is the one written for you. The rest
          still matters, because the records you open belong to someone else.
        </p>

        <h2 className="mt-10 mb-3 text-[18px] font-medium text-[#0C3569]">
          The account
        </h2>
        <p className="text-[15.5px] leading-[1.75]">
          Registration asks for a name, an email, a mobile number, and a
          password. The password is held by our login provider (Firebase
          Authentication, which is Google). We can send a reset. We cannot
          open the password and read it.
        </p>
        <p className="mt-4 text-[15.5px] leading-[1.75]">
          Each account has a role: rider, driver, or admin, and a status such
          as active, pending, or suspended. If a driver marks themselves
          online, the desk can see that they are free to take a trip.
        </p>

        <h2 className="mt-10 mb-3 text-[18px] font-medium text-[#0C3569]">
          A trip
        </h2>
        <p className="text-[15.5px] leading-[1.75]">
          When a ride is booked we store the pickup, the drop-off, the date,
          the start and end times, the fare, the ride type, and whether the
          trip was completed or cancelled. If someone leaves a rating, that
          stays on the ride too. The record names the rider and the driver,
          including the driver’s name and the rating they had at the time.
        </p>
        <p className="mt-4 text-[15.5px] leading-[1.75]">
          The map on the dashboard shows where a vehicle is during a live
          trip, so someone on the desk can follow a ride that is already
          moving. We do not keep a trail of where a person goes when they are
          not on a trip with us.
        </p>
        <p className="mt-4 text-[15.5px] leading-[1.75]">
          The map itself is Google Maps. Opening it can leave a Google cookie
          in the browser that loaded the page.
        </p>

        <h2 className="mt-10 mb-3 text-[18px] font-medium text-[#0C3569]">
          Renting a car
        </h2>
        <p className="text-[15.5px] leading-[1.75]">
          A rental record has the customer’s name, a phone number or email,
          the car, the plate number, the start date, the date it is due back,
          the rate, and whether the car is still out, overdue, or returned.
          Daily rates, late fees, and seasonal price changes are stored
          against the vehicle. They are not a profile of the customer.
        </p>

        <h2 className="mt-10 mb-3 text-[18px] font-medium text-[#0C3569]">
          Drivers
        </h2>
        <p className="text-[15.5px] leading-[1.75]">
          A driver gives us more than a phone number before they go on the
          road. We ask for:
        </p>
        <ul className="mt-3 ml-5 list-disc text-[15.5px] leading-[1.75] space-y-1">
          <li>a driver’s licence number</li>
          <li>a national ID number</li>
          <li>a home address</li>
          <li>bank details, so we can pay them</li>
          <li>a photo</li>
          <li>scans they upload, such as a passport</li>
          <li>the plate of the car they use</li>
        </ul>
        <p className="mt-4 text-[15.5px] leading-[1.75]">
          Those files sit in our storage, not on a staff member’s laptop. If
          a registration is waiting to be approved or turned down, we also
          note which staff member reviewed it and when.
        </p>

        <h2 className="mt-10 mb-3 text-[18px] font-medium text-[#0C3569]">
          Payments
        </h2>
        <p className="text-[15.5px] leading-[1.75]">
          For a fare or a rental charge we keep the method (card, bank
          transfer, or cash), the amount, the date, and whether the payment
          went through, failed, or is still pending. Full card numbers are
          not stored in our database. Where a card or transfer is handled by
          a payment company, that company keeps its own record under its own
          policy.
        </p>

        <h2 className="mt-10 mb-3 text-[18px] font-medium text-[#0C3569]">
          Password resets
        </h2>
        <p className="text-[15.5px] leading-[1.75]">
          A reset request stores the name, email, and phone number on the
          account, and whether we sent the reset by SMS or by email. We also
          log the IP address, a rough location, and the device or browser,
          for example Safari on a Mac. That is so we can tell a real request
          from someone else using the address. The staff member who clears
          the request is recorded as well.
        </p>

        <h2 className="mt-10 mb-3 text-[18px] font-medium text-[#0C3569]">
          Messages and help tickets
        </h2>
        <p className="text-[15.5px] leading-[1.75]">
          A general message or a help ticket is kept so the same problem is
          not handled twice. That includes whatever the person wrote, and a
          name if they gave one. FAQs published in the app are not personal
          records.
        </p>

        <h2 className="mt-10 mb-3 text-[18px] font-medium text-[#0C3569]">
          Who else sees it
        </h2>
        <p className="text-[15.5px] leading-[1.75]">
          The other person on a trip sees what they need to finish it. A
          driver gets the pickup. A rider sees the driver’s name and rating.
        </p>
        <p className="mt-4 text-[15.5px] leading-[1.75]">
          Staff on this dashboard can open user records, rides, rentals,
          vehicles, maintenance, and tickets. That access is for running
          Ollie Ride. We do not sell lists of riders or drivers.
        </p>
        <p className="mt-4 text-[15.5px] leading-[1.75]">
          Accounts and the database are hosted by Google through Firebase.
          The map is Google Maps. If we ever add a payment partner, they will
          see the charge they are asked to process, not the rest of the
          account.
        </p>

        <h2 className="mt-10 mb-3 text-[18px] font-medium text-[#0C3569]">
          How long we keep it
        </h2>
        <p className="text-[15.5px] leading-[1.75]">
          Trip and payment records stay long enough to settle a fare, answer
          a complaint, or close the books. Driver documents stay while the
          person is driving for us, and for a while after they stop, because
          a complaint about a trip can turn up later.
        </p>
        <p className="mt-4 text-[15.5px] leading-[1.75]">
          If you ask us to delete an account, we remove what we can. We will
          hold on to a record where a fare is still open, where there is a
          safety complaint, or where the law says we have to keep it.
        </p>

        <h2 className="mt-10 mb-3 text-[18px] font-medium text-[#0C3569]">
          People who work on the desk
        </h2>
        <p className="text-[15.5px] leading-[1.75]">
          An admin account is a name, an email, and sometimes a phone number,
          plus the password handled the same way as any other login. The
          session stays in that browser until you log out. On a shared
          computer, log out when you are done.
        </p>
        <p className="mt-4 text-[15.5px] leading-[1.75]">
          Actions such as approving a driver or clearing a password reset are
          stored with the staff account that did them. That is an audit
          trail, not a profile we use for anything else.
        </p>

        <h2 className="mt-10 mb-3 text-[18px] font-medium text-[#0C3569]">
          Asking for your data
        </h2>
        <p className="text-[15.5px] leading-[1.75]">
          You can ask what we hold, ask us to fix a wrong number or address,
          or ask us to close the account. Email{" "}
          <a
            href="mailto:privacy@ollieride.com"
            className="text-[#0C3569] underline"
          >
            privacy@ollieride.com
          </a>
          . If you already have the app, a help ticket is fine. Before we
          send licence scans or bank details anywhere, we will ask you to
          show the request is actually yours.
        </p>
        <p className="mt-4 text-[15.5px] leading-[1.75]">
          We do not open accounts for anyone under 18. A rider needs to be
          old enough to book, and a driver needs a licence.
        </p>

        <h2 className="mt-10 mb-3 text-[18px] font-medium text-[#0C3569]">
          Nigeria
        </h2>
        <p className="text-[15.5px] leading-[1.75]">
          Ollie Ride is run from Lagos. Personal data we hold on people in
          Nigeria is covered by the Nigeria Data Protection Act 2023. The
          requests in the section above are the rights that Act gives you. If
          you think we have handled your data badly and we have not put it
          right, you can also write to the Nigeria Data Protection
          Commission.
        </p>

        <h2 className="mt-10 mb-3 text-[18px] font-medium text-[#0C3569]">
          If this page changes
        </h2>
        <p className="text-[15.5px] leading-[1.75]">
          The date at the top moves when the page does. If we start asking
          for something new, a document at driver signup for example, we will
          put it on this page before we rely on it.
        </p>

        <p className="mt-10 text-[15.5px] leading-[1.75]">
          Questions go to{" "}
          <a
            href="mailto:privacy@ollieride.com"
            className="text-[#0C3569] underline"
          >
            privacy@ollieride.com
          </a>
          .
        </p>
      </article>
    </div>
  );
}

export default PrivacyPolicy;
