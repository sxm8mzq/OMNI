Feature: Opc Page SignIn User Place appliance Order With Visa

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @registeredUser @opcPagesignInUser @appliance @visaCard
  Scenario Outline: Registered user should be able to place appliance order with visa
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user click on " Account / Sign In "
    Then the user waits for webelement "acl-mt--x-large acl-mx--medium" with html attribute "class" to be visible
    Then the user waits for text "Email Address" to be visible
    Then the user enters text "<email>" in the textbox "Email Address"
    Then the user enters text "<password>" in the textbox "Password"
    Then the user clicks on the webelement with html tag "type" as "submit"
    Then the user waits for webelement "acl-title--x-large acl-mb--large" with html attribute "class" to be visible
    Then the user validates if " Hi John, My Account " text is visible
    Then the user checks if shipping addresses exists
    Then the user checks if cart is empty
    Then the user click on " Hi John, My Account "
    Then the user click on "Log Out"
    Then the user validates if webelement with html attribute "data-title" as "Hi" is not visible
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible 
    Then the user validates if " Delivery " text is visible
    Then the user validates if " Delivery options for " text is visible
    Then the user validates if "<postalCode>" text is visible 
    Then the user add product to cart
    Then the user click on "Decline"
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user click on "Checkout Now"
    Then the user waits for text "Secure Checkout" to be visible
    Then the user enters text "<email>" in the textbox "Email Address"
    Then the user enters text "<password>" in the textbox "Password"
    Then the user click on "Sign In & Checkout"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user validates if "Appliance Delivery" text is visible
    Then the user enters text "<firstName>" in the textbox " First Name"
    Then the user enters text "<lastName>" in the textbox " Last Name "
    Then the user enters text "<phone>" in the textbox " Phone Number "
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<city>" in the textbox " City"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
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
    Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"

    Examples:
      | email                 | password | firstName | lastName | address            | city        | province | phone      | postalCode|
      | donna_kunde@gmail.com | Test@123 | Test      | User     | 428 Ellesmere Road | Scarborough | Ontario  | 4704243224 | M1R4E6    |
