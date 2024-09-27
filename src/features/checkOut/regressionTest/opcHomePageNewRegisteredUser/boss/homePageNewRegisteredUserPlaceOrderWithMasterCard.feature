Feature: Verify User Registered From Home Page Is Able To Place Order On BOSS With Master Card

  Background: User launches url
    Given the user launches the url

  @checkOut @mCycle @regressionTest @homePageNewRegisteredUser @boss @masterCard
  Scenario Outline: Home page registered user should able to place order on boss with master card
    Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the webelement with html tag "title" as "Search"
    Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    Then the user click on "Select"
    Then the user click on " Account / Sign In "
    Then the user waits for webelement "acl-mt--x-large acl-mx--medium" with html attribute "class" to be visible
    Then the user waits for text "Email Address" to be visible
    Then the user click on " Create an Account "
    Then the user click on "Create Personal Account"
    Then the user enters text "<firstName>" in the textbox "First Name"
    Then the user enters text "<lastName>" in the textbox "Last Name"
    Then the user enters random email in the textbox "Email Address"
    Then the user enters text "<password>" in the textbox "Password"
    Then the user enters text "<postalCode>" in the textbox "Postal Code"
    Then the user waits for webelement "submit" with html attribute "type" to be visible
    Then the user clicks on the webelement with html tag "type" as "submit"
    Then the user waits for text " Your Account Has Been Created! " to be visible
    Then the user presses keyboard key "Escape"
    Then the user validates if " Hi Testuser, My Account " text is visible
    Then the user enters text sku in textbox with placeholder "What can we help you find?"
    Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    Then the user add product to cart
    Then the user click on "View Cart"
    Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    Then the user click on " Will be shipped to store "
    Then the user click on "Checkout Now"
    Then the user validates if "Store Pick-Up:" text is visible
    Then the user enters text "<phone>" in the textbox "Phone Number"
    Then the user click on "Continue"
    Then the user validates if webelement with html attribute "class" as "hdca-checkout__right " is visible
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
      | firstName | lastName    | address            | city        | province | postalCode | phone      | password |
      | Testuser  | WebdriverIO | 428 Ellesmere Road | Scarborough | Ontario  | M1R 4E6    | 4704243224 | Test@123 |
