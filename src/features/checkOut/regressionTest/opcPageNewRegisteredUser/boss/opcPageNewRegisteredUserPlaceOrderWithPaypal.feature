Feature: Registered User BOSS Place Order With Paypal

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @registeredUser @boss @paypal @opcPageNewRegUser
  Scenario Outline: Registered user should able to place order with paypal for boss
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
    Then the user click on " Will be shipped to store "
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Create an Account"
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox " Email "
    Then the user enters the text "<password>" in the textbox "Password" at index "6"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user clicks on the "Create Account" button at index "2"
    Then the user verifies if the webelement with html attribute "class" as "acl-card__header" at index "1" has text "Order Summary"
    Then the user validates if "Store Pick-Up:" text is visible
    Then the user enters text "<phoneNum>" in the textbox "Phone Number"
    Then the user click on "Continue"
    Then the user validates if webelement with html attribute "class" as "hdca-checkout__right " is visible
    Then the user clicks on the webelement with html tag "symbol" as "paypal"
    Then the user clicks on the webelement with html tag "class" as "acl-button__icon acl-icon acl-icon--size--xx-small"
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
      | firstName | lastName | password | postalCode | paypalUserName  | paypalPassword | phoneNum   |
      | Louis     | Chen     | Test@123 | M1R 4E6    | cabuyer2@thd.ca | 11111111       | 2365678914 |