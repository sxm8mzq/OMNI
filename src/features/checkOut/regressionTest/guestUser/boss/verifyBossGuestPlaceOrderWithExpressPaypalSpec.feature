Feature: Guest User BOSS Place Order With Express Paypal

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @guestUser @boss @paypal
  Scenario Outline: User should able to Place Order With Express Paypal
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
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOSS_"
    Then the user click on "Checkout with"
    Then the user waits for webelement  "Log in to your PayPal account" with html attribute "data-title" to be visible
    Then the user enters text "<paypalUserName>" in textbox with placeholder "Email or mobile number"
    Then the user click on "Next"
    Then the user enters text "<paypalPassword>" in textbox with placeholder "Password"
    Then the user click on "Log In"
    Then the user click on "Complete Purchase"
    Then the user validates if "Payment" text is visible
    Then the user click on "Continue"
    Then the user validates if xhref webelement "#check" at index "2" is visible
    Then the user waits for text "Review & Place Order" to be visible
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"
    Then the user saves primary details of the order

    Examples:
      | paypalUserName  | paypalPassword |
      | cabuyer2@thd.ca | 11111111       |