Feature: Guest User Appliance Place Order With HD Prox Card

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @guestUser @appliance @hdcc @mixedCart @bodfs @cswe
  Scenario Outline: User should able to place order with hd prox card
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user validates if " Delivery " text is visible
    Then the user validates if " Delivery options for " text is visible
    Then the user validates if "<postalCode>" text is visible
    Then the user add product to cart
    Then the user click on "Decline"
    Then the user click on "Continue Shopping"
    Then the user waits for webelement "acl-input ng-untouched ng-pristine ng-valid" with html attribute "class" to be visible
    Then the user clicks on the webelement with html tag "class" as "acl-input ng-untouched ng-pristine ng-valid"
    Then the user enters text "<RegularBodfsOpc>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks on the webelement with html tag "id" as "fulfillment_DELIVERY_SCD_<RegularBodfsOpc>"
    Then the user click on "Checkout Now"
    Then the user click on "Checkout as Guest"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user verifies if the webelement with html attribute "class" as "acl-accordion-panel__header-title" at index "1" has text "Add Delivery Instructions"
    Then the user enters random email in the textbox "Email Address"
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<phone>" in the textbox "Phone"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
    Then the user verifies if the webelement with html attribute "class" as "acl-vertical-progress-bar__header acl-flex-grow--1" at index "2" has text "Payment"
    Then the user switches to the frame "__zoid__card_sdk"
    Then the user enters the "Hdcc" card details
    Then the user switches to the parent frame
    Then the user enters billing details for "Hdcc" card
    Then the user click on "Continue"
    Then the user verifies if the webelement with html attribute "class" as "acl-vertical-progress-bar__header acl-flex-grow--1" at index "3" has text "Review & Place Order"
    Then the user waits for webelement "acl-button--theme--primary" with html attribute "class" to be visible
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"

    Examples:
      | RegularBodfsOpc | firstName | lastName   | address            | city        | province | postalCode | phone      |
      | 1000741513      | Testuser  | Automation | 428 Ellesmere Road | Scarborough | Ontario  | M1R 4E6    | 4704243224 |