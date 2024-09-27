Feature: Place Order With Master Card BOPIS STH

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @newRegisteredUser @mixedCart @masterCard @cswe
  Scenario: New registered user should be able to place Bopis and sth order with MasterCard
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for text " Delivery " to be visible
    Then the user click on " Delivery "
    Then the user add product to cart
    Then the user click on "Continue Shopping"
    Then the user clicks on the webelement with html tag "type" as "search"
    Then the user enters text "<bopis>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for text " Store Pick-Up " to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks on the element with html tag "id" as "fulfillment_SHIP_TO_HOME_" at index "1"
    Then the user clicks on the webelement with html tag "id" as "fulfillment_BOPIS_<bopis>"
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Create an Account"
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox " Email Address "
    Then the user enters the text "<password>" in the textbox "Password" at index "6"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user clicks on the "Create Account" button at index "2"
    Then the user waits for webelement "hdca-checkout__progress acl" with html attribute "class" to be visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters text "<phone>" in the textbox "Phone"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..." 
    Then the user click on "Continue"
    Then the signed in user selects pickup date
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Mastercard" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Mastercard" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"

    Examples:
      | bopis      | password | firstName | lastName    | address            | city        | province  | postalCode| phone      |
      | 1000740986 | Test@123 | TestUser  | WebdriverIO | 480 ellesmere road | Scarborough | Ontario   | M1R4E6    | 4704243210 |