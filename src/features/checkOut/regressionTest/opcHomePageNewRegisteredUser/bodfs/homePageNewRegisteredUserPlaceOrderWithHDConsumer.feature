Feature: New Registered User Place Order on BODFS With HDCC

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @homePageNewRegisteredUser @bodfs @registeredUser @hdcc
  Scenario Outline: New Home Page Registered user should able to Place Order on BODFS with HDCC
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user click on " Account / Sign In "
    Then the user click on " Create an Account "
    Then the user click on "Create Personal Account"
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox "Email Address"
    Then the user enters text "<password>" in the textbox "Password"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user clicks on the webelement with html tag "type" as "submit"
    Then the user waits for text " Your Account Has Been Created! " to be visible
    Then the user presses keyboard key "Escape"
    Then the user validates if " Hi Test, My Account " text is visible
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_DELIVERY_SCD"
    Then the user click on "Checkout Now"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user validates if "Delivery:" text is visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters text "<phone>" in the textbox " Phone Number "
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<city>" in the textbox " City"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
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

    Examples:
      | firstName | lastName    | address            | city        | province | postalCode | phone      | password |
      | Test      | WebdriverIO | 428 Ellesmere Road | Scarborough | Ontario  | M1R 4E6    | 4704243224 | Test@123 |