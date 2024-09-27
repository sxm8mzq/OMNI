Feature: Place Order With HD Consumer Card STH BOPIS BOSS

  Background: User launches url
    Given the user launches the url
    
  @checkOut @mCycle @regressionTest @opcPageNewRegisteredUser @mixedCart @cswe
  Scenario Outline: User should able to place order with hd consumer card sth bopis boss
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user enters text "<boss>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for text " Delivery " to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks on the webelement with html tag "id" as "fulfillment_BOSS_<boss>"
    Then the user clicks on the webelement with html tag "type" as "search"
    Then the user enters text "<bopis>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for text " Delivery " to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks on the webelement with html tag "id" as "fulfillment_BOPIS_<bopis>"
    Then the user clicks on the webelement with html tag "type" as "search"
    Then the user enters text "<sth>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for text " Delivery " to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks on the webelement with html tag "id" as "fulfillment_SHIP_TO_HOME_<sth>"
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
    Then the user verifies if the webelement with html attribute "class" as "acl-accordion-panel__header-title" at index "1" has text "Cart Summary:"
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters text "<phone>" in the textbox "Phone"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
    Then the user clicks on the element with html tag "padding" as "medium" at index "2"
    Then the user click on "Continue"
    Then the user validates if webelement with html attribute "class" as "hdca-checkout__right " is visible
    Then the user validates if webelement with html attribute "class" as "hdca-checkout__progress" is visible
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
      | password | boss       | bopis      | sth        | firstName | lastName    | address          | city        | province | postalCode | phone      |
      | Test@123 | 1000842600 | 1000657245 | 1000100110 | Testuser  | WebdriverIO | 480 Ellesmere Rd | Scarborough | Ontario  | M1R 4E6    | 4704243224 |