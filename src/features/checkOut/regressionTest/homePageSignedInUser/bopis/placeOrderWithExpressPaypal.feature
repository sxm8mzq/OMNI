Feature: Place Order With Express Paypal BOPIS

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @homePageSignedInUser @bopis @paypal @cswe
  Scenario Outline: User should able to place order with express paypal bopis
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user click on " Account / Sign In "
    Then the user waits for webelement "acl-mt--x-large acl-mx--medium" with html attribute "class" to be visible
    Then the user enters text "<email>" in the textbox "Email Address"
    Then the user enters text "<password>" in the textbox "Password"
    Then the user waits for webelement "submit" with html attribute "type" to be visible
    Then the user clicks on the webelement with html tag "type" as "submit"
    Then the user validates if " Hi John, My Account " text is visible
    Then the user checks if cart is empty
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user clicks on the webelement with html tag "symbol" as "paypal"
    Then the user waits for webelement "Log in to your PayPal account" with html attribute "data-title" to be visible
    Then the user validates if webelement with html attribute "class" as "paypal-logo paypal-logo-long" is visible
    Then the user validates if webelement with html attribute "class" as "login  " is visible
    Then the user validates if webelement with html attribute "id" as "login_emaildiv" is visible
    Then the user enters text "<paypalUserName>" in textbox with placeholder "Email or mobile number"
    Then the user click on "Next"
    Then the user waits for webelement "password" with html attribute "id" to be visible
    Then the user enters text "<paypalPassword>" in textbox with placeholder "Password"
    Then the user clicks on the webelement with html tag "id" as "btnLogin"
    Then the user click on "Complete Purchase"
    Then the user validates if "Store Pick-Up:" text is visible
    Then the user validates if "<email>" text is visible
    Then the user validates if the store pick up form is available
    Then the user clicks on the element with html tag "padding" as "medium" at index "1"
    Then the user click on "Continue"
    Then the user validates if "Payment" text is visible
    Then the user click on "Continue"
    Then the user validates if xhref webelement "#check" at index "2" is visible
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"

    Examples:
      | email                | password | paypalUserName  | paypalPassword | firstName | lastName |
      | marcos75@hotmail.com | Test@123 | cabuyer2@thd.ca | 11111111       | John      | Doe      |