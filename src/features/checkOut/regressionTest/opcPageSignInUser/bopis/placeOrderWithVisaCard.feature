Feature: Opc Page Signed In User Place Order With Visa Card

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @registeredUser @opcPagesignInUser @bopis @visaCard
  Scenario Outline: Registered user should place an order on bopis item with visa card by signing in from opc page
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user click on " Account / Sign In "
    Then the user waits for text "Email Address" to be visible
    Then the user enters text "<email>" in the textbox "Email Address"
    Then the user enters text "<password>" in the textbox "Password"
    Then the user waits for webelement "submit" with html attribute "type" to be visible
    Then the user clicks on the webelement with html tag "type" as "submit"
    Then the user validates if webelement with html attribute "data-title" as "Hi" is visible
    Then the user checks if shipping addresses exists
    Then the user checks if cart is empty
    Then the user click on " Hi John, My Account "
    Then the user click on "Log Out"
    Then the user validates if webelement with html attribute "data-title" as "Hi" is not visible
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user enters text "<email>" in the textbox "Email Address"
    Then the user enters text "<password>" in the textbox "Password"
    Then the user click on "Sign In & Checkout"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user validates if "Store Pick-Up" text is visible
    Then the user enters text "<phone>" in the textbox " Phone Number "
    Then the user clicks on the element with html tag "padding" as "medium" at index "2"
    Then the user waits for text "We will hold your item(s) until closing time " to be visible
    Then the user click on "Continue"
    Then the user waits for text "Apply a Gift Card" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Visa" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Visa" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if webelement with html attribute "class" as "acl-col--12 acl-pb--xx-small acl-pt--small" is visible

    Examples:
      | email                    | password | phone      | firstName | lastName |
      | khalil.kreiger@yahoo.com | Test@123 | 4704243224 | John      | Doe      |