import React from "react";

function RefundPolicy() {
  return (
    <div className="w-full bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Payment and Refund Policy – HRUDAYSPARSHA
        </h1>

        <p className="text-xl text-gray-800 mb-6 text-center">
          This Payment and Refund Policy ("Policy") governs the terms and
          conditions under which payments are made for services on the
          HRUDAYSPARSHA matrimonial site and outlines the procedures for seeking
          refunds.
        </p>

        {/* Section 1 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By registering for the HRUDAYSPARSHA and purchasing any membership
            or service ("Subscription"), you agree to be bound by the terms of
            this Policy, the Terms of Service, and the Privacy Policy of
            HRUDAYSPARSHA.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. Subscription and Pricing
          </h2>

          <h3 className="text-lg font-medium text-gray-700 mb-1">
            2.1 Pricing
          </h3>
          <p className="text-gray-700 mb-3">
            All prices for Subscriptions are listed in the currency specified on
            the HRUDAYSPARSHA and are subject to change without prior notice.
            Any changes in pricing will be communicated through the or via email
            before they take effect.
          </p>

          <h3 className="text-lg font-medium text-gray-700 mb-1">
            2.2 Service Period
          </h3>
          <p className="text-gray-700">
            Subscriptions are offered for fixed durations (e.g., 1 month, 3
            months) The services provided under the Subscription will only be
            active during the paid period.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. Mandatory Refund Window
          </h2>

          <h3 className="text-lg font-medium text-gray-700 mb-1">
            3.1 Right to Refund Upon Initial Registration
          </h3>
          <p className="text-gray-700 mb-3">
            After successfully completing the initial registration for one month
            Subscription plan and Three month Subscription plan on
            HRUDAYSPARSHA, you have a period of fifteen (15) calendar days to
            request a full refund of the amount paid for that Subscription.
          </p>

          <h3 className="text-lg font-medium text-gray-700 mb-1">
            3.2 Conditions for Refund
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              This 15-day refund window applies only to the first-time purchase
              of a Subscription following initial registration with
              HRUDAYSPARSHA. It does not apply to renewals, subsequent
              purchases, or upgrades.
            </li>
            <li>
              The request for a refund must be submitted in writing to our
              Customer Support team.
            </li>

            <li>
              Upon processing the refund, your service access will be
              immediately terminated.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. General Refund Policy (Outside 15-Day Window)
          </h2>

          <h3 className="text-lg font-medium text-gray-700 mb-1">
            4.1 No Refunds After 15 Days:
          </h3>
          <p className="text-gray-700 mb-3">
            Except for the mandatory 15-day window specified above (Section 3),
            all payments for Subscriptions are non-refundable.
          </p>

          <h3 className="text-lg font-medium text-gray-700 mb-1">
            4.2 Partial Usage:
          </h3>
          <p className="text-gray-700 mb-3">
            No refunds (pro-rata or otherwise) will be provided for any
            partially used Subscription period, regardless of the reason for
            termination or non-use (including inability to find a suitable
            match, account suspension due to policy violations, or voluntary
            cessation of use).
          </p>

          <h3 className="text-lg font-medium text-gray-700 mb-1">
            4.3 Technical IssuesTechnical Issues:
          </h3>
          <p className="text-gray-700">
            If a technical issue within the HRUDAYSPARSHA prevents you from
            accessing a paid service for an extended period, the may, at its
            sole discretion, extend your Subscription period to compensate for
            the downtime. Cash refunds will not be issued for technical
            interruptions.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Payment Methods and Billing
          </h2>

          <h3 className="text-lg font-medium text-gray-700 mb-1">
            5.1 Payment Processing
          </h3>
          <p className="text-gray-700 mb-3">
            Payments are processed through secure third-party payment gateways.
            HRUDAYSPARSHA does not store your full credit card details.
          </p>

          <h3 className="text-lg font-medium text-gray-700 mb-1">
            5.2 Billing Information
          </h3>
          <p className="text-gray-700 mb-3">
            You agree to provide current, complete, and accurate billing and
            payment information. Failure to pay any fees when due may result in
            the suspension or termination of your Subscription on HRUDAYSPARSHA.
          </p>

          <h3 className="text-lg font-medium text-gray-700 mb-1">
            5.3 Auto-Renewal
          </h3>
          <p className="text-gray-700">
            Unless explicitly cancelled by the user prior to the renewal date,
            Subscriptions may be set to automatically renew for the same
            duration as the previous subscription period, and the corresponding
            fee will be charged to the provided payment method.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            7. Contact Information
          </h2>
          <p className="text-gray-700">
            To request a refund under Section 3 or for any payment-related inquiries regarding HRUDAYSPARSHA, please contact our team.
          </p>
        </section>
      </div>
    </div>
  );
}

export default RefundPolicy;
