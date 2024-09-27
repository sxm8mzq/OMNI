Feature: Place an Order on BOSS and STH item With Amex Card

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @registeredUser @amex @homePageSignedInUser @mixedCart
  Scenario Outline: Home Page Signed in User should able to place order with amex card on BOSS and STH items
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
    Then the user waits for webelement "acl-title--x-large acl-mb--large" with html attribute "class" to be visible
    Then the user validates if " Hi John, My Account " text is visible
    Then the user checks if shipping addresses exists
    Then the user checks if cart is empty
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_SHIP_TO_HOME_"
    Then the user clicks on the webelement with html tag "class" as "acl-input ng-untouched ng-pristine ng-valid"
    Then the user enters text "<boss>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks on the webelement with html tag "id" as "fulfillment_BOSS_<boss>"
    Then the user click on "Checkout Now"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user validates if " Hi, John " text is visible
    Then the user validates if "Delivery" text is visible
    Then the user validates if "Store Pick-Up" text is visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters text "<phone>" in the textbox "Phone"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..." 
    Then the user click on "Continue"
    Then the user waits for text " Ship to Store " to be visible
    Then the user click on "Continue"
    Then the user waits for text "Apply a Gift Card" to be visible
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Amex" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Amex" card
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" is visible
    Then the user validates if webelement with html attribute "class" as "acl-row acl-text-size--small acl-py--small" is visible
    Then the user click on "Continue Shopping"
    Then the user validates if webelement with html attribute "class" as "acl-modal__backdrop acl-modal__backdrop--open" is visible

    Examples:

      | address            | city        | province | phone      | boss       | email                 | password | postalCode | firstName | lastName |
      | 428 ellesmere road | Scarborough | Ontario  | 4704243288 | 1000842600 | brendan14@hotmail.com | Test@123 | M1R4E6     | Test      | Account  |