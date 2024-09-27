Feature: Guest User Place order on BODFS SKU with LPT option using Visa Card

  Background: User launches url
    Given the user launches the url

  @regressionTest @guestUser @bodfs @expressDelivery @hdcc @checkOut @mcycle
  Scenario Outline: User should able to Place order on BODFS SKU with LPT option using Visa Card
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
    Then the user clicks the webelement containing html tag "id" as "fulfillment_DELIVERY_SCD_"
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user click on "Checkout as Guest"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user validates if "Delivery:" text is visible
    Then the user enters text "<firstName>" in the textbox " First Name"
    Then the user enters text "<lastName>" in the textbox " Last Name "
    Then the user enters random email in the textbox " Email Address "
    Then the user enters text "<phone>" in the textbox " Phone Number "
    Then the user enters text "<city>" in the textbox " City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user validates if "Select Delivery Options:" text is visible
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
      | firstName | lastName    | address          | city        | province | phone      |
      | TestUser  | WebdriverIO | 428 ELLESMERE RD | Scarborough | Ontario  | 4700148224 |