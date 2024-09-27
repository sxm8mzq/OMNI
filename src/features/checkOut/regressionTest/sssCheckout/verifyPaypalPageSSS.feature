Feature: Verify Paypal Page SSS

  Background: User launches url
    Given the user launches the url

  @checkOut1 @mCycle1 @regressionTest @sssCheckout @paypal
  Scenario Outline: User should able to verify paypal page SSS
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
    Then the user validates if " Hi John, My Account " text is visible
    Then the user checks if cart is empty
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for text "PICK UP IN-STORE" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks the webelement containing html tag "id" as "fulfillment_BOPIS_"
    Then the user click on "Checkout with"
    Then the user waits for webelement "PayPal Logo" with html attribute "aria-label" to be visible
    Then the user validates if webelement with html attribute "id" as "login" is visible
    Then the user enters text "<payPalEmail>" in textbox with placeholder "Email or mobile number"
    Then the user click on "Next"
    Then the user enters text "<payPalPassword>" in textbox with placeholder "Password"
    Then the user click on "Log In"
    Then the user click on "Complete Purchase"
    Then the user validates if webelement with html attribute "class" as "hdca-checkout-header__title" is visible
    Then the user triggers semi signed state by modifying cookies
    Then the user waits for text " Welcome Back " to be visible
    Then the user validates if " Welcome Back " text is visible
    Then the user validates if " Not You? " text is visible
    Then the user validates if webelement with html attribute "class" as "acl-color--title acl-weight--regular" is visible
    Then the user validates if " Forgot Password? " text is visible
    Then the user validates if webelement with html attribute "class" as "acl-mx--small acl-icon" is visible
    Then the user validates if the webelement with html attribute "class" as "ctHidden acl-color--title-dark" has text "**"
    Then the user validates if webelement with html attribute "class" as "ctHidden acl-input ng-untouched" is visible
    Then the user enters text "<password>" in the textbox "Password"
    Then the user click on "Confirm"
    Then the user validates if webelement with html attribute "class" as "hdca-checkout-header__title" is visible

    Examples: 
      | email               | password | payPalEmail     | payPalPassword |
      | willjohntry@try.com | Test@123 | cabuyer2@thd.ca | 11111111       |