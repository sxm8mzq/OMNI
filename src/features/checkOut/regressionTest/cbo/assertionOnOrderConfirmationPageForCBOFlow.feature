Feature: Verify CBO details are displayed on order confirmation page

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @guestUser @cbo @paypal
  Scenario Outline: Guest User should able to verify CBO details are displayed on order confirmation page
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "ma-placeholder" with html attribute "class" to be visible
    Then the user click on "Customize and Buy"
    Then the user waits for webelement "ma-placeholder" with html attribute "class" to be visible
    Then the user presses keyboard key "Escape"
    Then the user enters text "WindowName" in the textbox "Name Your Window"
    Then the user click on "Inside Mount"
    Then the user click on "White 5035"
    Then the user click on "Privacy Slats"
    Then the user click on "Add To Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user click on "Checkout Now"
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
    Then the user click on "Continue"
    Then the user waits for text "Apply a Gift Card" to be visible
    Then the user clicks on the webelement with html tag "symbol" as "paypal"
    Then the user waits for text " Please sign in to your PayPal account to complete your payment. You will be able to review the order before you place it. " to be visible
    Then the user click on "Continue with"
    Then the user waits for webelement "Log in to your PayPal account" with html attribute "data-title" to be visible
    Then the user enters text "<paypalUserName>" in textbox with placeholder "Email or mobile number"
    Then the user clicks on the webelement with html tag "id" as "btnNext"
    Then the user waits for webelement "password" with html attribute "id" to be visible
    Then the user enters text "<paypalPassword>" in textbox with placeholder "Password"
    Then the user clicks on the webelement with html tag "id" as "btnLogin"
    Then the user click on "Complete Purchase"
    Then the user waits for webelement "acl-button--theme--primary" with html attribute "class" to be visible
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2"
    Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if webelement with html attribute "class" as "acl-image__image-container" is visible
    Then the user validates if "Customization" text is visible
    Then the user validates if webelement with html attribute "class" as "acl-flex acl-flex--column acl-border--left" is visible
    Then the user validates if " Made-to-Order " text is visible

    Examples:
      | paypalUserName  | paypalPassword | firstName | lastName | address          | city        | province | phone      |
      | cabuyer2@thd.ca | 11111111       | Rosa      | Almidar  | 428 ELLESMERE RD | Scarborough | Ontario  | 4165985212 |