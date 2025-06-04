export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Shipping & Returns</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              At Anime Threads, we strive to deliver your orders as quickly and efficiently as possible. We ship
              worldwide and offer various shipping options to meet your needs.
            </p>

            <h3 className="text-xl font-bold mb-3">Processing Time</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              All orders are processed within 1-3 business days after payment confirmation. Orders placed on weekends or
              holidays will be processed on the next business day.
            </p>

            <h3 className="text-xl font-bold mb-3">Shipping Methods and Delivery Times</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#2a2a2a]">
                    <th className="py-3 px-4 text-left">Shipping Method</th>
                    <th className="py-3 px-4 text-left">Estimated Delivery Time</th>
                    <th className="py-3 px-4 text-left">Cost</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-[#2a2a2a]">
                    <td className="py-3 px-4">Standard Shipping (US)</td>
                    <td className="py-3 px-4">5-7 business days</td>
                    <td className="py-3 px-4">$5.99 (Free over $50)</td>
                  </tr>
                  <tr className="border-b border-[#2a2a2a]">
                    <td className="py-3 px-4">Express Shipping (US)</td>
                    <td className="py-3 px-4">2-3 business days</td>
                    <td className="py-3 px-4">$12.99</td>
                  </tr>
                  <tr className="border-b border-[#2a2a2a]">
                    <td className="py-3 px-4">International Standard</td>
                    <td className="py-3 px-4">10-15 business days</td>
                    <td className="py-3 px-4">$15.99 (Free over $100)</td>
                  </tr>
                  <tr className="border-b border-[#2a2a2a]">
                    <td className="py-3 px-4">International Express</td>
                    <td className="py-3 px-4">5-7 business days</td>
                    <td className="py-3 px-4">$24.99</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-400 leading-relaxed">
              Please note that delivery times are estimates and not guarantees. Delivery times may be affected by
              customs processing, weather conditions, or other factors beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
            <p className="text-gray-400 leading-relaxed">
              Once your order ships, you will receive a shipping confirmation email with a tracking number. You can
              track your order by clicking the tracking link in the email or by logging into your account on our
              website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">International Shipping</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We ship to most countries worldwide. Please note that international orders may be subject to import
              duties, taxes, and customs fees, which are the responsibility of the recipient. These charges vary by
              country and are not included in the purchase price or shipping cost.
            </p>
            <p className="text-gray-400 leading-relaxed">
              International delivery times may be longer due to customs processing. We recommend allowing extra time for
              international orders.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Return Policy</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              We want you to be completely satisfied with your purchase. If you're not happy with your order for any
              reason, we accept returns within 30 days of delivery.
            </p>

            <h3 className="text-xl font-bold mb-3">Return Eligibility</h3>
            <p className="text-gray-400 leading-relaxed mb-4">To be eligible for a return, your item must be:</p>
            <ul className="list-disc pl-6 text-gray-400 space-y-2 mb-6">
              <li>Unworn, unwashed, and in its original condition</li>
              <li>In its original packaging with all tags attached</li>
              <li>Returned within 30 days of delivery</li>
            </ul>

            <h3 className="text-xl font-bold mb-3">Return Process</h3>
            <ol className="list-decimal pl-6 text-gray-400 space-y-2 mb-6">
              <li>Contact our customer service team at returns@animethreads.com to request a return authorization</li>
              <li>Include your order number and reason for return</li>
              <li>Once approved, you will receive return instructions and a return shipping label (if applicable)</li>
              <li>Package your items securely and attach the return shipping label</li>
              <li>Ship your return using the specified carrier</li>
            </ol>

            <h3 className="text-xl font-bold mb-3">Refunds</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Once we receive and inspect your return, we will notify you of the approval or rejection of your refund.
              If approved, your refund will be processed within 5-7 business days. The refund will be credited to your
              original payment method.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Please note that shipping costs are non-refundable, and return shipping costs are the responsibility of
              the customer unless the return is due to our error (damaged or incorrect item).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
            <p className="text-gray-400 leading-relaxed">
              If you need to exchange an item for a different size or color, please follow the return process and place
              a new order for the desired item. This ensures you get the item you want as quickly as possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Damaged or Defective Items</h2>
            <p className="text-gray-400 leading-relaxed">
              If you receive a damaged or defective item, please contact our customer service team within 48 hours of
              delivery. Include your order number and photos of the damaged item. We will arrange for a replacement or
              refund at no additional cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-400 leading-relaxed">
              If you have any questions about our shipping or return policies, please contact our customer service team
              at support@animethreads.com or through our Contact page.
            </p>
          </section>

          <p className="text-gray-500 text-sm">Last Updated: June 4, 2025</p>
        </div>
      </div>
    </div>
  )
}
