import React, { useState, useCallback } from 'react';

// Main Component
const ApkGenerator = () => {
    const [activeTab, setActiveTab] = useState('basic');
    const [formData, setFormData] = useState({
        // Basic Info
        appName: 'My Awesome App',
        packageName: 'com.example.myapp',
        websiteUrl: 'https://example.com',
        appDescription: 'Detailed description of your application...',
        versionName: '1.0.0',
        versionCode: 1,
        developerName: 'Your Name',
        developerEmail: 'developer@example.com',
        // Advanced
        targetSdk: '34',
        minSdk: '21',
        orientationMode: 'unspecified',
        launchMode: 'standard',
        // WebView
        jsEnabled: true,
        domStorage: true,
        fileAccess: false,
        zoomControls: false,
        hardwareAccel: true,
        mixedContent: false,
        // Design
        appTheme: 'material',
        statusBarColor: 'default',
        primaryColor: '#667eea',
        primaryDarkColor: '#5a67d8',
        accentColor: '#f093fb',
        backgroundColor: '#ffffff',
        // UI Options
        splashScreen: true,
        progressBar: true,
        pullToRefresh: false,
        offlineMode: false,
        // Features & Permissions
        internetPermission: true,
        networkStatePermission: false,
        cameraPermission: false,
        storagePermission: false,
        locationPermission: false,
        microphonePermission: false,
        bluetoothPermission: false,
        vibratePermission: false,
        // Advanced Features
        pushNotifications: false,
        biometricAuth: false,
        deepLinking: false,
        fileSharing: false,
        analytics: false,
        crashReporting: false,
        // Build Config
        buildType: 'debug',
        signingConfig: 'debug',
        proguardEnabled: false,
        multiDexEnabled: false,
        shrinkResources: true,
        viewBinding: true,
        dataBinding: false,
    });
    const [outputFiles, setOutputFiles] = useState(null);

    const handleInputChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' || type === 'radio' ? checked : value
        }));
    }, []);

    const generateProjectFiles = () => {
        // In a real app, this would be complex logic. Here we generate placeholder strings.
        const manifestContent = `
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${formData.packageName}">

    ${formData.internetPermission ? '<uses-permission android:name="android.permission.INTERNET" />' : ''}
    ${formData.networkStatePermission ? '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />' : ''}
    ${formData.cameraPermission ? '<uses-permission android:name="android.permission.CAMERA" />' : ''}
    ${formData.storagePermission ? '<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />' : ''}
    ${formData.locationPermission ? '<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />' : ''}
    ${formData.microphonePermission ? '<uses-permission android:name="android.permission.RECORD_AUDIO" />' : ''}
    ${formData.bluetoothPermission ? '<uses-permission android:name="android.permission.BLUETOOTH" />' : ''}
    ${formData.vibratePermission ? '<uses-permission android:name="android.permission.VIBRATE" />' : ''}

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="${formData.appName}"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        ${formData.hardwareAccel ? 'android:hardwareAccelerated="true"' : ''}>
        
        <activity
            android:name=".MainActivity"
            android:screenOrientation="${formData.orientationMode}"
            android:launchMode="${formData.launchMode}">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;

        const buildGradleContent = `
plugins {
    id 'com.android.application'
}

android {
    compileSdk ${formData.targetSdk}

    defaultConfig {
        applicationId "${formData.packageName}"
        minSdk ${formData.minSdk}
        targetSdk ${formData.targetSdk}
        versionCode ${formData.versionCode}
        versionName "${formData.versionName}"
        ${formData.multiDexEnabled ? 'multiDexEnabled true' : ''}
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled ${formData.proguardEnabled}
            shrinkResources ${formData.shrinkResources}
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    buildFeatures {
        ${formData.viewBinding ? 'viewBinding true' : ''}
        ${formData.dataBinding ? 'dataBinding true' : ''}
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.10.0'
    ${formData.pullToRefresh ? "implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0'" : ''}
    // Add other dependencies based on selected features...
}`;

        setOutputFiles({
            'AndroidManifest.xml': manifestContent.trim(),
            'build.gradle (app)': buildGradleContent.trim()
        });
    };
    
    // Tab Data
    const tabs = [
        { id: 'basic', label: '📱 Basic Info' },
        { id: 'advanced', label: '⚙️ Advanced' },
        { id: 'design', label: '🎨 Design' },
        { id: 'features', label: '🔧 Features' },
        { id: 'build', label: '🏗️ Build Config' },
    ];

    return (
        <>
            <div className="background-pattern"></div>
            <div className="container">
                <header className="header">
                    <h1>🚀 Advanced Android APK Generator</h1>
                    <p className="subtitle">Professional-grade Android project generation with advanced features</p>
                    <div className="features-grid">
                        <div className="feature-badge">Multi-Activity Support</div>
                        <div className="feature-badge">Custom Themes</div>
                        <div className="feature-badge">Advanced Permissions</div>
                        <div className="feature-badge">ProGuard Rules</div>
                        <div className="feature-badge">Material Design</div>
                        <div className="feature-badge">Gradle Optimization</div>
                    </div>
                </header>

                <div className="tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className={`tab-content ${activeTab === 'basic' ? 'active' : ''}`}>
                    <BasicInfoTab formData={formData} handleInputChange={handleInputChange} />
                </div>
                <div className={`tab-content ${activeTab === 'advanced' ? 'active' : ''}`}>
                    <AdvancedTab formData={formData} handleInputChange={handleInputChange} />
                </div>
                <div className={`tab-content ${activeTab === 'design' ? 'active' : ''}`}>
                    <DesignTab formData={formData} handleInputChange={handleInputChange} />
                </div>
                <div className={`tab-content ${activeTab === 'features' ? 'active' : ''}`}>
                    <FeaturesTab formData={formData} handleInputChange={handleInputChange} />
                </div>
                <div className={`tab-content ${activeTab === 'build' ? 'active' : ''}`}>
                    <BuildConfigTab formData={formData} handleInputChange={handleInputChange} />
                </div>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button className="generate-btn" onClick={generateProjectFiles}>
                        Generate Project Files
                    </button>
                </div>
                
                {outputFiles && (
                    <div className="output-container">
                        <h2 className="section-title">Generated Files</h2>
                        {Object.entries(outputFiles).map(([filename, content]) => (
                            <FileOutput key={filename} filename={filename} content={content} />
                        ))}
                         <div className="download-section">
                            <p style={{marginBottom: '15px', color: '#333'}}>Ready to build? Download the complete project structure.</p>
                            <button className="download-btn">Download Project (.zip)</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

// Sub-components for each tab and reusable elements

const SectionTitle = ({ children }) => <h2 className="section-title">{children}</h2>;

const FormGroup = ({ label, children }) => (
    <div className="form-group">
        <label htmlFor={children.props.id}>{label}</label>
        {children}
    </div>
);

const CheckboxItem = ({ id, label, checked, onChange }) => (
    <div className="checkbox-item">
        <input type="checkbox" id={id} name={id} checked={checked} onChange={onChange} />
        <label htmlFor={id} style={{ marginBottom: 0, fontWeight: 500 }}>{label}</label>
    </div>
);

const ToggleSwitch = ({ id, checked, onChange }) => (
    <label className="toggle-switch">
        <input type="checkbox" id={id} name={id} checked={checked} onChange={onChange} />
        <span className="slider"></span>
    </label>
);

const FileOutput = ({ filename, content }) => {
    const [copyText, setCopyText] = useState('Copy');

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopyText('Copied!');
        setTimeout(() => setCopyText('Copy'), 2000);
    };

    return (
        <div className="file-output">
            <div className="file-header">
                <span>{filename}</span>
                <button className="copy-btn" onClick={handleCopy}>{copyText}</button>
            </div>
            <div className="file-content">
                <pre><code>{content}</code></pre>
            </div>
        </div>
    );
};

// Tab Components

const BasicInfoTab = ({ formData, handleInputChange }) => (
    <>
        <SectionTitle>Basic Application Information</SectionTitle>
        <div className="form-grid">
            <FormGroup label="Application Name *">
                <input type="text" id="appName" name="appName" placeholder="My Awesome App" value={formData.appName} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup label="Package Name *">
                <input type="text" id="packageName" name="packageName" placeholder="com.example.myapp" value={formData.packageName} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup label="Website URL *">
                <input type="url" id="websiteUrl" name="websiteUrl" placeholder="https://example.com" value={formData.websiteUrl} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup label="App Description">
                <textarea id="appDescription" name="appDescription" placeholder="Detailed description of your application..." value={formData.appDescription} onChange={handleInputChange}></textarea>
            </FormGroup>
            <div className="form-group-inline">
                <FormGroup label="Version Name">
                    <input type="text" id="versionName" name="versionName" value={formData.versionName} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup label="Version Code">
                    <input type="number" id="versionCode" name="versionCode" value={formData.versionCode} onChange={handleInputChange} />
                </FormGroup>
            </div>
            <div className="form-group-inline">
                <FormGroup label="Developer Name">
                    <input type="text" id="developerName" name="developerName" placeholder="Your Name" value={formData.developerName} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup label="Developer Email">
                    <input type="email" id="developerEmail" name="developerEmail" placeholder="developer@example.com" value={formData.developerEmail} onChange={handleInputChange} />
                </FormGroup>
            </div>
        </div>
    </>
);

const AdvancedTab = ({ formData, handleInputChange }) => (
    <>
        <SectionTitle>Advanced Configuration</SectionTitle>
        <div className="form-grid">
            <FormGroup label="Target SDK Version">
                <select id="targetSdk" name="targetSdk" value={formData.targetSdk} onChange={handleInputChange}>
                    <option value="34">Android 14 (API 34)</option>
                    <option value="33">Android 13 (API 33)</option>
                    <option value="32">Android 12L (API 32)</option>
                    <option value="31">Android 12 (API 31)</option>
                    <option value="30">Android 11 (API 30)</option>
                </select>
            </FormGroup>
            <FormGroup label="Minimum SDK Version">
                <select id="minSdk" name="minSdk" value={formData.minSdk} onChange={handleInputChange}>
                    <option value="21">Android 5.0 (API 21)</option>
                    <option value="23">Android 6.0 (API 23)</option>
                    <option value="24">Android 7.0 (API 24)</option>
                    <option value="26">Android 8.0 (API 26)</option>
                    <option value="28">Android 9.0 (API 28)</option>
                </select>
            </FormGroup>
            <FormGroup label="Screen Orientation">
                <select id="orientationMode" name="orientationMode" value={formData.orientationMode} onChange={handleInputChange}>
                    <option value="unspecified">Unspecified</option>
                    <option value="portrait">Portrait Only</option>
                    <option value="landscape">Landscape Only</option>
                    <option value="sensor">Sensor Based</option>
                </select>
            </FormGroup>
            <FormGroup label="Launch Mode">
                <select id="launchMode" name="launchMode" value={formData.launchMode} onChange={handleInputChange}>
                    <option value="standard">Standard</option>
                    <option value="singleTop">Single Top</option>
                    <option value="singleTask">Single Task</option>
                    <option value="singleInstance">Single Instance</option>
                </select>
            </FormGroup>
        </div>
        <div className="advanced-options">
            <h3>WebView Configuration</h3>
            <div className="checkbox-grid">
                <CheckboxItem id="jsEnabled" label="JavaScript Enabled" checked={formData.jsEnabled} onChange={handleInputChange} />
                <CheckboxItem id="domStorage" label="DOM Storage" checked={formData.domStorage} onChange={handleInputChange} />
                <CheckboxItem id="fileAccess" label="File Access" checked={formData.fileAccess} onChange={handleInputChange} />
                <CheckboxItem id="zoomControls" label="Zoom Controls" checked={formData.zoomControls} onChange={handleInputChange} />
                <CheckboxItem id="hardwareAccel" label="Hardware Acceleration" checked={formData.hardwareAccel} onChange={handleInputChange} />
                <CheckboxItem id="mixedContent" label="Mixed Content" checked={formData.mixedContent} onChange={handleInputChange} />
            </div>
        </div>
    </>
);

const DesignTab = ({ formData, handleInputChange }) => (
    <>
        <SectionTitle>Design & Theming</SectionTitle>
        <div className="form-grid">
            <FormGroup label="App Theme">
                <select id="appTheme" name="appTheme" value={formData.appTheme} onChange={handleInputChange}>
                    <option value="material">Material Design</option>
                    <option value="materialDark">Material Dark</option>
                    <option value="custom">Custom Theme</option>
                    <option value="noActionBar">No Action Bar</option>
                </select>
            </FormGroup>
            <FormGroup label="Status Bar Style">
                <select id="statusBarColor" name="statusBarColor" value={formData.statusBarColor} onChange={handleInputChange}>
                    <option value="default">Default</option>
                    <option value="transparent">Transparent</option>
                    <option value="colored">Colored</option>
                    <option value="hidden">Hidden</option>
                </select>
            </FormGroup>
        </div>
        <div className="advanced-options">
            <h3>Color Scheme</h3>
            <div className="color-picker-group">
                <div className="color-input">
                    <input type="color" id="primaryColor" name="primaryColor" value={formData.primaryColor} onChange={handleInputChange} />
                    <label htmlFor="primaryColor">Primary Color</label>
                </div>
                <div className="color-input">
                    <input type="color" id="primaryDarkColor" name="primaryDarkColor" value={formData.primaryDarkColor} onChange={handleInputChange} />
                    <label htmlFor="primaryDarkColor">Primary Dark</label>
                </div>
                <div className="color-input">
                    <input type="color" id="accentColor" name="accentColor" value={formData.accentColor} onChange={handleInputChange} />
                    <label htmlFor="accentColor">Accent Color</label>
                </div>
                <div className="color-input">
                    <input type="color" id="backgroundColor" name="backgroundColor" value={formData.backgroundColor} onChange={handleInputChange} />
                    <label htmlFor="backgroundColor">Background</label>
                </div>
            </div>
        </div>
        <div className="advanced-options">
            <h3>UI Options</h3>
            <div className="checkbox-grid">
                <CheckboxItem id="splashScreen" label="Splash Screen" checked={formData.splashScreen} onChange={handleInputChange} />
                <CheckboxItem id="progressBar" label="Loading Progress Bar" checked={formData.progressBar} onChange={handleInputChange} />
                <CheckboxItem id="pullToRefresh" label="Pull to Refresh" checked={formData.pullToRefresh} onChange={handleInputChange} />
                <CheckboxItem id="offlineMode" label="Offline Mode Support" checked={formData.offlineMode} onChange={handleInputChange} />
            </div>
        </div>
    </>
);

const FeaturesTab = ({ formData, handleInputChange }) => (
    <>
        <SectionTitle>Features & Permissions</SectionTitle>
        <div className="advanced-options">
            <h3>Required Permissions</h3>
            <div className="checkbox-grid">
                <CheckboxItem id="internetPermission" label="Internet Access" checked={formData.internetPermission} onChange={handleInputChange} />
                <CheckboxItem id="networkStatePermission" label="Network State" checked={formData.networkStatePermission} onChange={handleInputChange} />
                <CheckboxItem id="cameraPermission" label="Camera Access" checked={formData.cameraPermission} onChange={handleInputChange} />
                <CheckboxItem id="storagePermission" label="Storage Access" checked={formData.storagePermission} onChange={handleInputChange} />
                <CheckboxItem id="locationPermission" label="Location Services" checked={formData.locationPermission} onChange={handleInputChange} />
                <CheckboxItem id="microphonePermission" label="Microphone" checked={formData.microphonePermission} onChange={handleInputChange} />
                <CheckboxItem id="bluetoothPermission" label="Bluetooth" checked={formData.bluetoothPermission} onChange={handleInputChange} />
                <CheckboxItem id="vibratePermission" label="Vibration" checked={formData.vibratePermission} onChange={handleInputChange} />
            </div>
        </div>
        <div className="advanced-options">
            <h3>Advanced Features</h3>
            <div className="checkbox-grid">
                <CheckboxItem id="pushNotifications" label="Push Notifications" checked={formData.pushNotifications} onChange={handleInputChange} />
                <CheckboxItem id="biometricAuth" label="Biometric Authentication" checked={formData.biometricAuth} onChange={handleInputChange} />
                <CheckboxItem id="deepLinking" label="Deep Linking" checked={formData.deepLinking} onChange={handleInputChange} />
                <CheckboxItem id="fileSharing" label="File Sharing" checked={formData.fileSharing} onChange={handleInputChange} />
                <CheckboxItem id="analytics" label="Analytics Integration" checked={formData.analytics} onChange={handleInputChange} />
                <CheckboxItem id="crashReporting" label="Crash Reporting" checked={formData.crashReporting} onChange={handleInputChange} />
            </div>
        </div>
    </>
);

const BuildConfigTab = ({ formData, handleInputChange }) => (
    <>
        <SectionTitle>Build Configuration</SectionTitle>
        <div className="form-grid">
            <FormGroup label="Build Type">
                <select id="buildType" name="buildType" value={formData.buildType} onChange={handleInputChange}>
                    <option value="debug">Debug</option>
                    <option value="release">Release</option>
                    <option value="both">Both</option>
                </select>
            </FormGroup>
            <FormGroup label="Signing Configuration">
                <select id="signingConfig" name="signingConfig" value={formData.signingConfig} onChange={handleInputChange}>
                    <option value="debug">Debug Key</option>
                    <option value="release">Release Key</option>
                    <option value="custom">Custom Keystore</option>
                </select>
            </FormGroup>
            <div className="form-group">
                <label>Code Obfuscation (ProGuard)</label>
                <ToggleSwitch id="proguardEnabled" checked={formData.proguardEnabled} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>MultiDex Support</label>
                <ToggleSwitch id="multiDexEnabled" checked={formData.multiDexEnabled} onChange={handleInputChange} />
            </div>
        </div>
        <div className="advanced-options">
            <h3>Optimization Settings</h3>
            <div className="checkbox-grid">
                <CheckboxItem id="shrinkResources" label="Shrink Resources" checked={formData.shrinkResources} onChange={handleInputChange} />
                <CheckboxItem id="viewBinding" label="View Binding" checked={formData.viewBinding} onChange={handleInputChange} />
                <CheckboxItem id="dataBinding" label="Data Binding" checked={formData.dataBinding} onChange={handleInputChange} />
            </div>
        </div>
    </>
);

export default ApkGenerator;
