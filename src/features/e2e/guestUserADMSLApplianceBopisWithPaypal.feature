Feature: Guest User Validated Order Summary Section For Mixed Cart With ADMSL Skus

  Background: User launches url
    Given the user launches the url

  @cart @regressionTest @guestUser @cswe @admslMixed @qpAdmsl @e2e
  Scenario Outline: User should able to verify order summary for admsl mixed cart
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_APPLIANCE_LITE"
    Then the user waits for webelement "acl-action-button" with html attribute "class" to be visible
    Then the user validates if the "border-color" of webelement with html tag "id" as "fulfillment_APPLIANCE_LITE" is "rgba(249,99,2,1)"
    Then the user waits for text "Delivery Details" to be visible
    Then the user clicks the webelement containing html tag "type" as "search"
    Then the user enters text "<sthSku2>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user click on " Delivery "
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user waits for text "Delivery Details" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_SHIP_TO_HOME"
    Then the user waits for text "Delivery Details" to be visible
    Then the user clicks the webelement containing html tag "type" as "search"
    Then the user enters text "<majorApplianceSku>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user click on " Delivery "
    Then the user add product to cart
    Then the user click on "Decline"
    Then the user waits for text "Added To Cart" to be visible
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_APPLIANCE"
    Then the user clicks the webelement containing html tag "type" as "search"
    Then the user enters text "<bopisSku>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user click on " Store Pick-Up "
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user waits for text "Delivery Details" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS"
    Then the user validates if " Order Summary " text is visible
    Then the user validates if " Order Subtotal " text is visible
    Then the user validates if " Delivery " text is visible
    Then the user validates if " Appliance Delivery " text is visible
    Then the user validates if " Store Pick-Up " text is visible
    Then the user validates if " Estimated Taxes* " text is visible
    Then the user validates if " Estimated Order Total " text is visible
    Then the user validates if " Estimated Order Total " text is visible
    Then the user validates if total item in cart is equal to item count in cart header and mini cart
    Then the user validates if the webelement with html attribute "class" as "acl-weight--regular" has text "4 item(s)"
    Then the user click on "Checkout Now"
    Then the user waits for text " Checkout as Guest " to be visible
    Then the user click on "Checkout as Guest"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user validates if "Delivery:" text is visible
    Then the user enters text "<firstName>" in the textbox " First Name"
    Then the user enters text "<lastName>" in the textbox " Last Name "
    Then the user enters random email in the textbox " Email Address "
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user enters text "<phone>" in the textbox " Phone Number "
    Then the user enters text "<city>" in the textbox " City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox " Postal Code"
    Then the user click on "Continue"
    Then the user validates if " Pick-Up Store " text is visible
    Then the user clicks on the element with html tag "class" as "tile" at index "1"
    Then the user click on "Continue"
    Then the user validates if webelement with html attribute "classname" as "acl-p--small md:acl-p--large acl-mt--small" is visible
    Then the user waits for text "Credit Card" to be visible
    Then the user clicks on the webelement with html tag "symbol" as "paypal"
    Then the user waits for text " Please sign in to your PayPal account to complete your payment. You will be able to review the order before you place it. " to be visible
    Then the user click on "Continue with"
    Then the user waits for webelement "Log in to your PayPal account" with html attribute "data-title" to be visible
    Then the user enters text "<paypalUserName>" in textbox with placeholder "Email or mobile number"
    Then the user clicks on the webelement with html tag "id" as "btnNext"
    Then the user enters text "<paypalPassword>" in textbox with placeholder "Password"
    Then the user clicks on the webelement with html tag "id" as "btnLogin"
    Then the user click on "Complete Purchase"
    Then the user waits for webelement "submit" with html attribute "type" to be visible
    Then the user click on "Continue"
    Then the user waits for text "Place Order $" to be visible
    Then the user clicks on text "Place Order $" at index "1"
    Then the user waits for webelement "order-confirmation-success-message" with html attribute "evtperfname" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"

    Examples:
      | majorApplianceSku | sthSku2    | bopisSku   | email               | paypalUserName  | paypalPassword | firstName | lastName    | address            | city        | province | phone      | postalCode |
      | 1000807737        | 1000100248 | 1000419473 | john.test@gmail.com | cabuyer2@thd.ca | 11111111       | Testuser  | WebdriverIO | 428 Ellesmere Road | Scarborough | Ontario  | 4704243224 | M1R 4E6    |