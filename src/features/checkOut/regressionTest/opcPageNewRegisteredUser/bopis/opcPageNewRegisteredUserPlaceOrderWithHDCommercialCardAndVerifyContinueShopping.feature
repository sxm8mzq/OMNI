Feature: Verify Registered User is able to order bopis with HD commercial Card

  Background: User launches url
    Given the user launches the url
 
  @checkOut @mCycle @regressionTest @guestUser @bopis @hdcc @opcPageNewRegUser
  Scenario Outline: Registered User should able to order bopis with HD commercial Card
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
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Create an Account"
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox " Email Address "
    Then the user enters the text "<password>" in the textbox "Password" at index "6"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user clicks on the "Create Account" button at index "2"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user validates if "Store Pick-Up" text is visible
    Then the user enters text "<phone>" in the textbox " Phone Number "
    Then the user clicks on the element with html tag "padding" as "medium" at index "2"
    Then the user waits for text "We will hold your item(s) until closing time " to be visible
    Then the user click on "Continue"
    Then the user waits for text "Apply a Gift Card" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Hdcc" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Hdcc" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"
    Then the user click on "Continue Shopping"
    Then the user validates if webelement with html attribute "aria-label" as "The Home Depot homepage" is visible

    Examples:
      | firstName | lastName    | password | address            | city        | province | postalCode | phone      |
      | Testuser  | WebdriverIO | Test@123 | 428 Ellesmere Road | Scarborough | Ontario  | M1R 4E6    | 4704243224 |