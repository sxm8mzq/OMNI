Feature: New Registered User Appliance Place Order With CTI Opted In PIP For Visa Card

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @homePageNewRegisteredUser @appliance @registeredUser @visaCard
  Scenario Outline: Registered user should able to Place Order With CTI Opted In PIP For Visa Card
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
    Then the user validates if " Hi <firstName>, My Account " text is visible
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user validates if " Delivery " text is visible
    Then the user validates if " Delivery options for " text is visible
    Then the user validates if "<postalCode>" text is visible 
    Then the user validates if " Add Installation Including Parts " checkbox is not selected
    Then the user clicks on the checkbox " Add Installation Including Parts "
    Then the user add product to cart
    Then the user click on "Decline"
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user validates if "Installation Including Parts" checkbox is selected
    Then the user click on "Checkout Now"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user validates if "Appliance Delivery" text is visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters text "<phone>" in the textbox " Phone Number "
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<city>" in the textbox " City"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
    Then the user waits for text "Credit Card" to be visible
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
      | firstName | lastName | password | postalCode | appliancePostalCodeBox | address          | city        | province | phone      |
      | Fname     | Lname    | Test@123 | M1R 4E6    | M1R 4E6                | 428 ELLESMERE RD | Scarborough | Ontario  | 4700243228 |
