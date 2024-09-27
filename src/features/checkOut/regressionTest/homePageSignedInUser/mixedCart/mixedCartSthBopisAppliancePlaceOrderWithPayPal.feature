Feature: Place Order Sth Bopis Appliance With Paypal

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @homePageSignedInUser @mixedCart @paypal
  Scenario Outline: Registered user should able to place order sth bopis appliance with paypal
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
    Then the user enters text "<sth>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user waits for webelement "acl-modal__container acl-display--block" with html attribute "class" to be visible
    Then the user click on "Continue Shopping"
    Then the user clicks on the webelement with html tag "type" as "search"
    Then the user enters text "<bopis>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user click on " Store Pick-Up "
    Then the user add product to cart
    Then the user waits for text "Added To Cart" to be visible
    Then the user click on "Continue Shopping"
    Then the user clicks on the webelement with html tag "type" as "search"
    Then the user enters text "<appliance>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product__description" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user click on "Decline"
    Then the user waits for text "Added To Cart" to be visible
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user clicks on the webelement with html tag "id" as "fulfillment_SHIP_TO_HOME_<sth>"
    Then the user click on "Checkout Now"
    Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
    Then the user validates if " Hi, John " text is visible
    Then the user validates if "Store Pick-Up" text is visible
    Then the user validates if "Appliance Delivery" text is visible
    Then the user validates if "Delivery" text is visible
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters text "<phone>" in the textbox "Phone"
    Then the user enters value "<province>" in dropdown "Province"
    Then the user enters text "<city>" in the textbox "City"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
    Then the user click on "Continue"
    Then the user clicks on the element with html tag "padding" as "medium" at index "2"
    Then the user waits for text "We will hold your item(s) until closing time " to be visible
    Then the user click on "Continue"
    Then the user waits for text "Apply a Gift Card" to be visible
    Then the user clicks on the webelement with html tag "symbol" as "paypal"
    Then the user waits for text " Please sign in to your PayPal account to complete your payment. You will be able to review the order before you place it. " to be visible
    Then the user click on "Continue with"
    Then the user waits for webelement "Log in to your PayPal account" with html attribute "data-title" to be visible
    Then the user enters text "<paypalUserName>" in textbox with placeholder "Email or mobile number"
    Then the user clicks on the webelement with html tag "id" as "btnNext"
    Then the user enters text "<paypalPassword>" in textbox with placeholder "Password"
    Then the user clicks on the webelement with html tag "id" as "btnLogin"
    Then the user click on "Complete Purchase"
    Then the user waits for webelement "acl-button--theme--primary" with html attribute "class" to be visible
    Then the user click on "Continue"
    Then the user waits for text "Place Order " to be visible
    Then the user clicks on text "Place Order" at index "2" 
    Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
    Then the user validates if " Your order was successful. " text is visible
    Then the user validates if webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" is visible
    Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"

    Examples:
      | email             | password | sth        | bopis      | appliance  | address            | city        | province | phone      | paypalUserName  | paypalPassword | postalCode | firstName | lastName |
      | walton7@gmail.com | Test@123 | 1000741513 | 1000740986 | 1001189803 | 428 ellesmere road | Scarborough | Ontario  | 4704243224 | cabuyer2@thd.ca | 11111111       | M1R4E6     | Test      | Account  |