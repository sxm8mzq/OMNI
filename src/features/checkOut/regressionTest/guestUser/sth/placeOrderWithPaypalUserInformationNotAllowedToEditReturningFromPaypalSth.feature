Feature: Place Order With Paypal User Iformation Not Allowed To Edit Returning From Paypal

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @guestUser @sth @paypal
  Scenario Outline: User should able to place order with paypal user information not allowed to edit returning from paypal
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product__description" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_SHIP_TO_HOME_"
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Checkout as Guest"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user validates if "Delivery:" text is visible
    Then the user validates if "Order Subtotal" text is visible
    Then the user validates if "Estimated Taxes" text is visible
    Then the user validates if "Estimated Order Total" text is visible
    Then the user enters text "<firstName>" in the textbox " First Name"
    Then the user enters text "<lastName>" in the textbox " Last Name "
    Then the user enters random email in the textbox " Email Address "
    Then the user enters text "<phone>" in the textbox " Phone Number "
    Then the user enters text "<city>" in the textbox " City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
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
    Then the user waits for webelement "acl-button--theme--primary" with html attribute "class" to be visible
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"

    Examples:
      | firstName | lastName | address            | city        | province | phone      | paypalUserName  | paypalPassword |
      | Test      | User     | 428 Ellesmere Road | Scarborough | Ontario  | 4704243288 | cabuyer2@thd.ca | 11111111       |